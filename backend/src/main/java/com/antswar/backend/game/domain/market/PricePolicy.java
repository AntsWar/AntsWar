package com.antswar.backend.game.domain.market;

import com.antswar.backend.game.domain.news.News;
import com.antswar.backend.game.domain.news.NewsEffect;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public class PricePolicy {
    private static final double STEP = 0.05;

    private static RateRange rangeOf(PurchaseMeta purchaseMeta, List<News> news ){
        RateRange baseRange = baseRangeOf(purchaseMeta.getType());
        double newsImpact = calculateNewsImpact(purchaseMeta, news);
        return baseRange.shift(newsImpact);
    }

    private static RateRange baseRangeOf(PurchaseType type) {
        return type == PurchaseType.STOCK
                ? new RateRange(-0.05, 0.05)
                : new RateRange(-0.2, 0.2);
    }

    public static double nextRate(PurchaseMeta meta, List<News> news) {
        RateRange range = rangeOf(meta, news);
        int minStep = (int) Math.round(range.min() / STEP);
        int maxStep = (int) Math.round(range.max() / STEP);

        int randomStep = ThreadLocalRandom.current().nextInt(minStep, maxStep + 1);

        return randomStep * STEP;
    }

    private static double calculateNewsImpact(PurchaseMeta meta, List<News> news) {
        return news.stream()
                .flatMap(n -> n.getMeta().getEffects().stream())
                .filter(effect -> effect.meta().equals(meta))
                .mapToDouble(NewsEffect::impact)
                .sum();

    }

    record RateRange(double min, double max) {
        public RateRange {
            if (min > max) {
                throw new IllegalArgumentException("min은 max보다 클 수 없습니다.");
            }
        }

        public RateRange shift(double value) {
            return new RateRange(min + value, max + value);
        }
    }
}
