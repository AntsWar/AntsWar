package com.antswar.backend.game.domain.player;

import com.antswar.backend.game.domain.Money;
import com.antswar.backend.game.domain.market.PurchaseMeta;
import com.antswar.backend.game.exception.GameException;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static com.antswar.backend.game.exception.GameErrorCode.POSITION_NOT_ENOUGH_QUANTITY;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Position {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false)
    private Player player;
    @Enumerated(EnumType.STRING)
    private PurchaseMeta purchaseMeta;
    @Enumerated(EnumType.STRING)
    private PositionType type;
    private int quantity;
    private Money averagePrice;

    protected Position(Player player, PurchaseMeta purchaseMeta, PositionType type) {
        this.player = player;
        this.purchaseMeta = purchaseMeta;
        this.type = type;
        this.quantity = 0;
        this.averagePrice = Money.of(0);
    }

    public boolean isEmpty(){
        return quantity <= 0;
    }

    protected void add(int quantity, Money price) {
        validateQuantity(quantity);

        Money prevTotalCost = this.averagePrice.times(this.quantity);
        Money newTotalCost = prevTotalCost.add(price.times(quantity));

        this.quantity += quantity;
        this.averagePrice = newTotalCost.divide(this.quantity);
    }

    protected void subtract(int quantity) {
        validateQuantity(quantity);
        if (this.quantity < quantity) throw new GameException(POSITION_NOT_ENOUGH_QUANTITY);
        this.quantity -= quantity;
        if(isEmpty()) averagePrice = Money.of(0);
    }

    public void delist() {
        this.quantity = 0;
        averagePrice = Money.of(0);
    }

    private void validateQuantity(int quantity) {
        if (quantity <= 0) throw new IllegalArgumentException("수량은 1 이상");
    }

    boolean match(PurchaseMeta meta, PositionType type){
        return this.purchaseMeta.equals(meta) && this.type.equals(type);
    }

    boolean match(PurchaseMeta meta){
        return this.purchaseMeta.equals(meta);
    }
}
