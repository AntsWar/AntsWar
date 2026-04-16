package com.antswar.backend.game.application.port.in.readyGame;

import com.antswar.backend.game.application.dto.request.readyGame.JoinGameCommand;

public interface JoinGame {
    void join(JoinGameCommand command);
}
