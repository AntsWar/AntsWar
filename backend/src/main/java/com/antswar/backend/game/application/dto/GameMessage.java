package com.antswar.backend.game.application.dto;

import java.time.LocalDateTime;
import java.util.List;

public record GameMessage(List<PurchaseInfo> purchases, List<PlayerInfo> players, LocalDateTime serverTime) {
    public static GameMessage of(List<PurchaseInfo> purchases, List<PlayerInfo> players, LocalDateTime now){
        return new GameMessage(purchases, players, now);
    }
}
