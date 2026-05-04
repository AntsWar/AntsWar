package com.antswar.backend.game.domain.game;

import com.antswar.backend.game.domain.purchase.PurchaseMeta;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Component
public class PurchaseRespawnBoard {
    private final Map<PurchaseMeta, Integer> respawns = new EnumMap<>(PurchaseMeta.class);
    private static final int RESPAWN_TICK = 4;

    public void reserve(PurchaseMeta meta) {
        respawns.put(meta, RESPAWN_TICK);
    }

    public List<PurchaseMeta> tick() {
        List<PurchaseMeta> completed = new ArrayList<>();

        respawns.replaceAll((meta, remainingTick) -> remainingTick - 1);

        respawns.entrySet().removeIf(entry -> {
            if (entry.getValue() <= 0) {
                completed.add(entry.getKey());
                return true;
            }
            return false;
        });

        return completed;
    }
}