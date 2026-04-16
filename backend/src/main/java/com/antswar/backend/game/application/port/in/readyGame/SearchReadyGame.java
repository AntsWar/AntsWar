package com.antswar.backend.game.application.port.in.readyGame;

import com.antswar.backend.game.application.dto.response.GameInfo;
import com.antswar.backend.game.application.dto.request.readyGame.SearchGameQuery;

import java.util.List;

public interface SearchReadyGame {
    List<GameInfo> search(SearchGameQuery query);
}
