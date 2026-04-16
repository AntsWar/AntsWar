package com.antswar.backend.game.application.dto.request.readyGame;

import com.antswar.backend.game.domain.game.GameMode;

public record RegisterGameCommand(String name, String password, String hostId, GameMode mode, int capacity) {
}
