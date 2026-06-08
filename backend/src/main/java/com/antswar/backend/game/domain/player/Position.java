package com.antswar.backend.game.domain.player;

import com.antswar.backend.game.domain.purchase.Purchase;
import com.antswar.backend.game.domain.purchase.PurchaseMeta;
import com.antswar.backend.game.domain.vo.Money;
import com.antswar.backend.game.exception.GameException;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static com.antswar.backend.game.exception.GameErrorCode.POSITION_MUST_AT_LEAST_1_QUANTITY;
import static com.antswar.backend.game.exception.GameErrorCode.POSITION_NOT_ENOUGH_QUANTITY;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Position {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private Long id;

    @Getter
    @ManyToOne(optional = false)
    private Player player;

    @Getter
    @ManyToOne(optional = false)
    private Purchase purchase;

    @Getter
    @Enumerated(EnumType.STRING)
    private PositionType type;

    @Getter
    private int quantity;

    @Getter
    @Embedded
    private Money averagePrice;

    protected Position(Player player, Purchase purchase, PositionType type) {
        this.player = player;
        this.purchase = purchase;
        this.type = type;
        this.quantity = 0;
        this.averagePrice = Money.ZERO;
    }

    public boolean isEmpty(){
        return quantity <= 0;
    }

    public Money getTotalPrice() {
        return getTotalPrice(this.quantity);
    }

    public Money getTotalPrice(int quantity) {
        if(quantity <= 0) return Money.ZERO;
        return switch (type) {
            case LONG -> purchase.calculateTotalPrice(quantity);
            case SHORT -> averagePrice.times(2).subtract(purchase.getPrice()).times(quantity);
        };
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
        if (quantity <= 0) throw new GameException(POSITION_MUST_AT_LEAST_1_QUANTITY);
    }

}
