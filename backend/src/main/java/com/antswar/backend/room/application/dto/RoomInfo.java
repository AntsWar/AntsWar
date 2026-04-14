package com.antswar.backend.room.application.dto;

import com.antswar.backend.room.domain.Room;
import com.antswar.backend.room.domain.RoomMode;
import com.antswar.backend.room.domain.RoomStatus;

public record RoomInfo(String publicId, String name, boolean hasPassword, RoomStatus status, RoomMode mode) {
    public static RoomInfo from(Room room){
        return new RoomInfo(room.getPublicId(), room.getName(), room.hasPassword(), room.getStatus(), room.getRoomMode());
    }
}
