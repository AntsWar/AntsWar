package com.antswar.backend.game.application.dto;

import com.antswar.backend.game.domain.room.Room;
import com.antswar.backend.game.domain.room.RoomMode;

public record RoomInfo(String id, String name, boolean hasPassword, RoomMode mode, Occupancy occupancy) {
    public record Occupancy (int currentCount, int capacity){ }

    public static RoomInfo from(Room room){
        return new RoomInfo(
                room.getId(),
                room.getName(),
                room.hasPassword(),
                room.getMode(),
                new Occupancy(room.getPlayers().size(), room.getCapacity()));
    }
}
