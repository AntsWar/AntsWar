package com.antswar.backend.game.application.port.in.runningGame;

import com.antswar.backend.game.application.dto.request.runningGame.GetGameQuery;
import com.antswar.backend.game.application.dto.response.runningGame.GetGameResult;

public interface GetGame {
    GetGameResult get(GetGameQuery query);
}
