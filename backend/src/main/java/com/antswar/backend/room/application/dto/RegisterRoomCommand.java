package com.antswar.backend.room.application.dto;

import com.antswar.backend.room.domain.RoomMode;

public record RegisterRoomCommand(String name, String password, String hostId, RoomMode mode) {
}
