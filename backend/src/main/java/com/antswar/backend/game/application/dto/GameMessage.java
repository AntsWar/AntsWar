package com.antswar.backend.game.application.dto;

import java.time.Instant;
import java.util.List;

public record GameMessage(List<PurchaseInfo> purchases, List<PlayerInfo> players, Instant serverTime) {
    public static GameMessage of(List<PurchaseInfo> purchases, List<PlayerInfo> players, Instant now){
        return new GameMessage(purchases, players, now);
    }
}
