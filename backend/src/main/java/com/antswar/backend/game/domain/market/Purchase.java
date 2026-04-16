package com.antswar.backend.game.domain.market;

import com.antswar.backend.game.domain.Money;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Purchase {
    private final PurchaseMeta meta;
    private Money price;

    public Money calculateTotalPrice(int quantity) {
        validateQuantity(quantity);
        return price.times(quantity);
    }

    private void validateQuantity(int quantity) {
        if (quantity <= 0) throw new IllegalArgumentException("수량은 1 이상");
    }
}
