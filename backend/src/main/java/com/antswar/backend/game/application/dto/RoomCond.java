package com.antswar.backend.game.application.dto;

import com.antswar.backend.game.domain.game.GameStatus;

public record RoomCond(String name, GameStatus status) {
}
