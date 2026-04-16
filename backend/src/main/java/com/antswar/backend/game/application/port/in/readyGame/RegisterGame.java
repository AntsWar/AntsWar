package com.antswar.backend.game.application.port.in.readyGame;

import com.antswar.backend.game.application.dto.request.readyGame.RegisterGameCommand;
import com.antswar.backend.game.application.dto.response.readyGame.RegisterGameResult;

public interface RegisterGame {
    RegisterGameResult register(RegisterGameCommand command);
}
