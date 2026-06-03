package com.antswar.backend.game.application.dto;

import com.antswar.backend.game.domain.Game;
import com.antswar.backend.game.domain.item.Item;

import java.time.LocalDateTime;
import java.util.List;

public record GameInfo(long id, GameMeta meta, List<PurchaseInfo> purchases, List<PlayerInfo> players, List<ItemInfo> items, LocalDateTime serverTime){
    public record GameMeta(LocalDateTime startedAt, LocalDateTime endedAt){ }

    public static GameInfo of(Game game, List<PurchaseInfo> purchases, List<PlayerInfo> players, LocalDateTime now){
        List<ItemInfo> items = ItemInfo.from();
        return new GameInfo(game.getId(), new GameMeta(game.getStartedAt(), game.getEndedAt()), purchases, players, items, now);
    }
}
