package com.antswar.backend.game.domain.market;

public class PricePolicy {
    public static RateRange rangeOf(PurchaseMeta purchaseMeta){
        return baseRangeOf(purchaseMeta.getType());
    }

    private static RateRange baseRangeOf(PurchaseType type) {
        return type == PurchaseType.STOCK
                ? new RateRange(-0.05, 0.05)
                : new RateRange(-0.2, 0.2);
    }
}
