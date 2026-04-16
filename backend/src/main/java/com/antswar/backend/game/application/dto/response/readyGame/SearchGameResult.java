package com.antswar.backend.game.application.dto.response.readyGame;

import com.antswar.backend.game.application.dto.response.GameInfo;

public record SearchGameResult(GameInfo room, Occupancy occupancy) {
    public record Occupancy (int currentCount, int capacity){ }
}
