package com.antswar.backend.game.domain.player;

import com.antswar.backend.game.domain.purchase.Purchase;
import com.antswar.backend.game.domain.purchase.PurchaseMeta;
import com.antswar.backend.game.domain.game.Game;
import com.antswar.backend.game.domain.vo.Money;
import com.antswar.backend.game.exception.GameException;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.*;

import static com.antswar.backend.game.exception.GameErrorCode.*;
import static org.springframework.util.StringUtils.hasText;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
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
    private Money money;

    @Getter
    private double noticeRate;

    private boolean deActive;

    @Getter
    private boolean bot;

    @OneToMany(mappedBy = "player", cascade = CascadeType.PERSIST)
    private final List<Position> positions = new ArrayList<>();

    private Player(String name, Money money, Game game) {
        this.name = validateName(name);
        this.game = Objects.requireNonNull(game);
        this.money = money;
        this.noticeRate = 0.3;
        for (PurchaseMeta meta : PurchaseMeta.values()) {
            positions.add(new Position(this, meta, PositionType.LONG));
            positions.add(new Position(this, meta, PositionType.SHORT));
        }
    }

    public static Player user(String name, Game game) {
        return new Player(name, Money.of(3_000), game);
    }

    public static Player bot(String name, Game game) {
        Player player = new Player(name, Money.of(3_000), game);
        player.bot = true;
        return player;
    }

    private String validateName(String name){
        if (!hasText(name)) throw new IllegalArgumentException("이름 필수");
        return name;
    }

    public void buy(Purchase purchase, PositionType type, int quantity) {
        if(purchase.isDelisted()) throw new GameException(PURCHASE_DELISTED);
        Position position = getPosition(purchase.getMeta(), type);
        Money totalPrice = purchase.calculateTotalPrice(quantity);
        if(money.compareTo(totalPrice) < 0) throw new GameException(PLAYER_NOT_ENOUGH_MONEY);
        position.add(quantity, purchase.getPrice());
        pay(totalPrice);
    }

    public void buy(Item item) {
        validateEnoughMoney(item);
        pay(item.getPrice());

        if (item == Item.NEWS_RADAR) {
            this.noticeRate = 1.0;
        }
    }

    public void sell(Purchase purchase, PositionType type, int quantity) {
        if(purchase.isDelisted()) throw new GameException(PURCHASE_DELISTED);
        Position position = getPosition(purchase.getMeta(), type);
        Money totalPrice = type == PositionType.LONG
                ?purchase.calculateTotalPrice(quantity)
                :position.getAveragePrice().times(2).subtract(purchase.getPrice()).times(quantity);
        this.money = this.money.add(totalPrice);
        position.subtract(quantity);
    }

    public void onDelisted(PurchaseMeta meta){
        positions.forEach(position -> {
            if(position.match(meta)) position.delist();
        });
    }

    public void earn(Money money){
        this.money = this.money.add(money);
    }

    private Position getPosition(PurchaseMeta meta, PositionType type) {
        return positions.stream()
                .filter(position -> position.match(meta, type))
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

    private void validateEnoughMoney(Item item) {
        if (this.money.compareTo(item.getPrice()) < 0) {
            throw new GameException(PLAYER_NOT_ENOUGH_MONEY);
        }
    }

    private void pay(Money price) {
        this.money = this.money.subtract(price);
    }

    public void changeMoney(Money money){
        this.money = money;
    }
}