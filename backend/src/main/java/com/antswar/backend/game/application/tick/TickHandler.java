package com.antswar.backend.game.application.tick;

import com.antswar.backend.game.domain.Game;

import java.time.Instant;

public interface TickHandler {
    void handle(Game game, Instant now);
}
