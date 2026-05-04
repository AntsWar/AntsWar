package com.antswar.backend.game.domain.policy;

import com.antswar.backend.game.domain.purchase.PurchaseMeta;
import com.antswar.backend.game.domain.purchase.PurchaseType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Random;

@RequiredArgsConstructor
@Component
public class PricePolicy {
    private final Random random = new Random();
    private static final double STEP = 0.05;

    public double nextRate(PurchaseMeta meta, int impact) {
        RateRange range = baseRangeOf(meta.getType());
        int minStep = range.min() + impact;
        int maxStep = range.max() + impact;

        int randomStep = random.nextInt(maxStep - minStep + 1) + minStep;

        return randomStep * STEP;
    }

    private static RateRange baseRangeOf(PurchaseType type) {
        return type == PurchaseType.STOCK
                ? new RateRange(-1, 1)
                : new RateRange(-4, 4);
    }

    record RateRange(int min, int max) { }
}
