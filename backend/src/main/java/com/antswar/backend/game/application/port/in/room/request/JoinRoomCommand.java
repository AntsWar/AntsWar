package com.antswar.backend.game.application.port.in.room.request;

public record JoinRoomCommand(String roomId, String password, String playerId, String playerName) {
}
