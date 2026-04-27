package com.antswar.backend.game.application.dto;

import com.antswar.backend.game.domain.room.Room;
import com.antswar.backend.game.domain.room.RoomStatus;

import java.time.Instant;
import java.util.List;

public record GameInfo(GameMeta meta, List<PlayerInfo> players, List<PurchaseInfo> purchases, Instant serverTime){
    public record GameMeta(RoomStatus status, Instant startedAt){ }

    public static GameInfo of(Room room, Instant now){
        List<PlayerInfo> players = room.getPlayers().stream()
                .map(PlayerInfo::from).toList();

        RoomStatus status = room.getStatus();

        GameMeta meta = new GameMeta(status, status == RoomStatus.WAITING ? null : room.getGame().getStartedAt());
        List<PurchaseInfo> purchases = status == RoomStatus.WAITING
                ? List.of()
                : room.getGame().getPurchases().stream()
                .map(PurchaseInfo::from)
                .toList();

        return new GameInfo(meta, players, purchases, now);
    }
}
