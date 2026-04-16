package com.antswar.backend.game.application.port.in.runningGame;

import com.antswar.backend.game.application.dto.response.runningGame.GetMeResult;

public interface GetMe {
    GetMeResult me(String gameId, String playerId);
}
