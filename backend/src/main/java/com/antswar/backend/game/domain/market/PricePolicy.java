package com.antswar.backend.game.domain.market;

import java.util.concurrent.ThreadLocalRandom;

public class PricePolicy {
    private static final double STEP = 0.05;

    private static RateRange rangeOf(PurchaseMeta purchaseMeta){
        return baseRangeOf(purchaseMeta.getType());
    }

    private static RateRange baseRangeOf(PurchaseType type) {
        return type == PurchaseType.STOCK
                ? new RateRange(-0.05, 0.05)
                : new RateRange(-0.2, 0.2);
    }

    public static double nextRate(PurchaseMeta meta) {
        RateRange range = rangeOf(meta);
        int minStep = (int) Math.round(range.min() / STEP);
        int maxStep = (int) Math.round(range.max() / STEP);

        int randomStep = ThreadLocalRandom.current().nextInt(minStep, maxStep + 1);

        return randomStep * STEP;
    }

    record RateRange(double min, double max) {
        public RateRange {
            if (min > max) {
                throw new IllegalArgumentException("min은 max보다 클 수 없습니다.");
            }
        }
    }
}
