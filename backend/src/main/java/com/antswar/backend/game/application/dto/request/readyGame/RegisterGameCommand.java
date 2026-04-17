package com.antswar.backend.game.application.dto.request.readyGame;

import com.antswar.backend.game.domain.game.GameMode;
import com.antswar.backend.game.domain.player.Player;

public record RegisterGameCommand(String name, String password, Player host, GameMode mode, int capacity) {
}
