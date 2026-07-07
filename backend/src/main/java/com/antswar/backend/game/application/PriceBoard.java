package com.antswar.backend.game.application;

import com.antswar.backend.game.domain.purchase.PurchaseMeta;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class PriceBoard {

    private static final int DEFAULT_DURATION_TICKS = 8;

    private final List<ActiveEffect> activeEffects = new ArrayList<>();
    private final Map<PurchaseMeta, Integer> totalImpacts = new EnumMap<>(PurchaseMeta.class);

    public void add(Map<PurchaseMeta, Integer> effects) {
        ActiveEffect activeEffect = ActiveEffect.of(effects, DEFAULT_DURATION_TICKS);
        activeEffects.add(activeEffect);
        apply(activeEffect);
    }

    public void tick() {
        Iterator<ActiveEffect> iterator = activeEffects.iterator();

        while (iterator.hasNext()) {
            ActiveEffect activeEffect = iterator.next();

            activeEffect.tick();

            if (activeEffect.isExpired()) {
                rollback(activeEffect);
                iterator.remove();
            }
        }
    }

    public int impactOf(PurchaseMeta purchaseMeta) {
        return totalImpacts.getOrDefault(purchaseMeta, 0);
    }

    public void reset() {
        activeEffects.clear();
        totalImpacts.clear();
    }

    private void apply(ActiveEffect activeEffect) {
        activeEffect.effects().forEach((meta, impact) ->
                totalImpacts.merge(meta, impact, Integer::sum)
        );
    }

    private void rollback(ActiveEffect activeEffect) {
        activeEffect.effects().forEach((meta, impact) ->
                totalImpacts.merge(meta, -impact, Integer::sum)
        );
    }

    private static class ActiveEffect {

        private final Map<PurchaseMeta, Integer> effects;
        private int remainingTicks;

        private ActiveEffect(Map<PurchaseMeta, Integer> effects, int remainingTicks) {
            this.effects = new EnumMap<>(effects);
            this.remainingTicks = remainingTicks;
        }

        static ActiveEffect of(Map<PurchaseMeta, Integer> effects, int durationTicks) {
            return new ActiveEffect(effects, durationTicks);
        }

        void tick() {
            remainingTicks--;
        }

        boolean isExpired() {
            return remainingTicks <= 0;
        }

        Map<PurchaseMeta, Integer> effects() {
            return effects;
        }
    }
}
