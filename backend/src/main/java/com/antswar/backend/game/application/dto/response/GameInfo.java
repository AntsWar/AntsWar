package com.antswar.backend.game.application.dto.response;

import com.antswar.backend.game.domain.game.Game;
import com.antswar.backend.game.domain.game.GameMode;
import com.antswar.backend.game.domain.game.GameStatus;

public record GameInfo(String publicId, String name, boolean hasPassword, GameStatus status, GameMode mode) {
    public static GameInfo from(Game game){
        return new GameInfo(game.getId(), game.getName(), game.hasPassword(), game.getStatus(), game.getMode());
    }
}
