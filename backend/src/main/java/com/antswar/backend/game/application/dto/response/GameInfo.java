package com.antswar.backend.game.application.dto.response;

import com.antswar.backend.game.domain.game.Game;
import com.antswar.backend.game.domain.game.GameMode;
import com.antswar.backend.game.domain.game.GameStatus;

public record GameInfo(String id, String name, boolean hasPassword, GameStatus status, GameMode mode, Occupancy occupancy) {
    public record Occupancy (int currentCount, int capacity){ }

    public static GameInfo from(Game game){
        return new GameInfo(
                game.getId(),
                game.getName(),
                game.hasPassword(),
                game.getStatus(),
                game.getMode(),
                new Occupancy(game.getPlayers().size(), game.getPlayers().getCapacity()));
    }
}
