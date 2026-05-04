package com.antswar.backend.game.application.port.in;

import com.antswar.backend.game.application.dto.GameInfo;
import com.antswar.backend.game.application.port.in.request.JoinGameCommand;
import com.antswar.backend.game.application.port.in.response.JoinGameResult;

public interface JoinGame {
    JoinGameResult join(JoinGameCommand command);
}
