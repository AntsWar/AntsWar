package com.antswar.backend.game.application.port.in;

import com.antswar.backend.game.application.port.in.response.GetMeResult;

public interface GetMe {
    GetMeResult me(long playerId);
}
