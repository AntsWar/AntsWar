package com.antswar.backend.game.application.dto;

import com.antswar.backend.game.domain.game.Game;
import com.antswar.backend.game.domain.player.Item;

import java.time.Instant;
import java.util.List;

public record GameInfo(long id, GameMeta meta, List<PurchaseInfo> purchases, List<PlayerInfo> players, List<ItemInfo> items, Instant serverTime){
    public record GameMeta(Instant startedAt, Instant endedAt){ }

    public static GameInfo of(Game game, List<PurchaseInfo> purchases, List<PlayerInfo> players, Instant now){
        GameMeta meta = new GameMeta(game.getStartedAt(), game.getEndedAt());

        return new GameInfo(game.getId(), meta, purchases, players, ItemInfo.from() ,now);
    }
}
