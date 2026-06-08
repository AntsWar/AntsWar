package com.antswar.backend.game.domain.player;

import com.antswar.backend.game.domain.purchase.Purchase;
import com.antswar.backend.game.domain.Game;
import com.antswar.backend.game.domain.vo.Money;
import com.antswar.backend.game.exception.GameException;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.*;

import static com.antswar.backend.game.exception.GameErrorCode.*;
import static org.springframework.util.StringUtils.hasText;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Player{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private Long id;

    @Getter
    private String name;

    @Getter
    @ManyToOne(fetch = FetchType.LAZY)
    private Game game;

    @Getter
    @Embedded
    private Money balance;

    @Getter
    private boolean deActive;

    @Getter
    private boolean bot;

    @OneToMany(mappedBy = "player", cascade = CascadeType.PERSIST)
    private final List<Position> positions = new ArrayList<>();

    public Player(String name, Game game, Money balance) {
        this.name = validateName(name);
        this.game = Objects.requireNonNull(game);
        this.balance = balance;
    }

    public static Player user(String name, Game game) {
        Player player =  new Player(name, game, Money.of(3_000));

        for (Purchase purchase : game.getPurchases()) {
            player.positions.add(new Position(player, purchase, PositionType.LONG));
            player.positions.add(new Position(player, purchase, PositionType.SHORT));
        }

        return player;
    }

    public static Player bot(String name, Game game) {
        Player player = new Player(name, game, Money.of(3_000));
        player.bot = true;
        return player;
    }

    private String validateName(String name){
        if (!hasText(name)) throw new GameException(PLAYER_MUST_HAVE_NAME);
        return name;
    }

    public void buy(Purchase purchase, PositionType type, int quantity) {
        if(purchase.isDelisted()) throw new GameException(PURCHASE_DELISTED);
        Position position = getPosition(purchase, type);
        Money totalPrice = purchase.calculateTotalPrice(quantity);
        pay(totalPrice);
        position.add(quantity, purchase.getPrice());
    }

    public void sell(Position position, int quantity) {
        Purchase purchase = position.getPurchase();
        if(purchase.isDelisted()) throw new GameException(PURCHASE_DELISTED);
        if(!position.getPlayer().getId().equals(this.getId())) throw new GameException(POSITION_NOT_PLAYERS);

        Money totalPrice = position.getTotalPrice(quantity);
        earn(totalPrice);
        position.subtract(quantity);
    }

    private Position getPosition(Purchase purchase, PositionType type) {
        return positions.stream()
                .filter(position -> position.getType().equals(type))
                .filter(position -> position.getPurchase().getId().equals(purchase.getId()))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("초기 포지션이 존재해야 함"));
    }

    public List<Position> getPositions(){
        return positions.stream()
                .filter(position -> !position.isEmpty())
                .toList();
    }

    public void leave(){
        if(this.deActive) return;
        this.deActive = true;
    }

    public void earn(Money money){
        this.balance = this.balance.add(money);
    }

    public void pay(Money price) {
        if(balance.compareTo(price) < 0) throw new GameException(PLAYER_NOT_ENOUGH_MONEY);
        this.balance = this.balance.subtract(price);
    }

    public void changeBalance(Money balance){
        this.balance = balance;
    }

    public Money getAsset() {
        return balance.add(
                positions.stream()
                .map(Position::getTotalPrice)
                .reduce(Money.ZERO, Money::add)
        );
    }
}