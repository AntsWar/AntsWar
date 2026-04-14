package com.antswar.backend.room.application.dto;

import com.antswar.backend.room.domain.RoomStatus;

public record RoomCond(String name, RoomStatus status) {
}
