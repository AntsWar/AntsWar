package com.antswar.backend.game.domain.player;

import com.antswar.backend.game.domain.Money;
import com.antswar.backend.game.domain.market.PurchaseMeta;
import com.antswar.backend.game.exception.GameException;
import lombok.Getter;

import static com.antswar.backend.game.exception.GameErrorCode.POSITION_NOT_ENOUGH_QUANTITY;

@Getter
public class Position {
    private final PurchaseMeta purchaseMeta;
    private int quantity;
    private Money averagePrice;

    protected Position(PurchaseMeta purchaseMeta) {
        this.purchaseMeta = purchaseMeta;
    }

    protected void add(int quantity, Money price) {
        validateQuantity(quantity);

        Money totalCost = getTotalCost().add(price.times(quantity));
        this.quantity += quantity;
        this.averagePrice = totalCost.divide(this.quantity);
    }

    protected void subtract(int quantity) {
        validateQuantity(quantity);
        if (this.quantity < quantity) throw new GameException(POSITION_NOT_ENOUGH_QUANTITY);
        this.quantity -= quantity;
    }

    protected Money getTotalCost() {
        return averagePrice.times(quantity);
    }

    protected boolean isEmpty() {
        return quantity == 0;
    }

    private void validateQuantity(int quantity) {
        if (quantity <= 0) throw new IllegalArgumentException("수량은 1 이상이어야 합니다.");
    }
}
