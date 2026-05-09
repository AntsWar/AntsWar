package com.antswar.backend.game.application.dto;

import com.antswar.backend.game.domain.event.GameDomainEvent;

import java.util.List;

public record TickResult(long gameId, GameMessage game, List<GameDomainEvent> events) {
}
