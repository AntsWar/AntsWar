package com.antswar.backend.game.application.port.in.game;

import com.antswar.backend.game.application.port.in.game.response.GetMeResult;

public interface GetMe {
    GetMeResult me(String gameId, String playerId);
}
