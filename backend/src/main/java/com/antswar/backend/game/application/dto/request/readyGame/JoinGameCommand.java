package com.antswar.backend.game.application.dto.request.readyGame;

public record JoinGameCommand(String roomId, String password, String playerId, String playerName) {
}
