package com.antswar.backend.game.application.port.in.room.request;

import com.antswar.backend.game.domain.room.RoomMode;

public record RegisterRoomCommand(String name, String password, String hostId, String hostName, RoomMode mode, int capacity) {
}
