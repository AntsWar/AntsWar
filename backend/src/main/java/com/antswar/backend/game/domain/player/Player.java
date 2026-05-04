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

    @ManyToOne(fetch = FetchType.LAZY)
    private Game game;

    @Getter
    @Embedded
    private Money money;

    private boolean deActive;

    @OneToMany(mappedBy = "player", cascade = CascadeType.PERSIST)
    private final List<Position> positions = new ArrayList<>();

    public Player(String name, Game game) {
        this.name = validateName(name);
        this.game = Objects.requireNonNull(game);
        this.money = Money.of(1000);
        for (PurchaseMeta meta : PurchaseMeta.values()) {
            positions.add(new Position(this, meta, PositionType.LONG));
            positions.add(new Position(this, meta, PositionType.SHORT));
        }
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
        this.money = this.money.subtract(totalPrice);
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
}