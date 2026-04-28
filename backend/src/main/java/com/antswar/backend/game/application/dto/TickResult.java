package com.antswar.backend.game.application.dto;

import com.antswar.backend.game.domain.event.GameDomainEvent;

import java.util.List;

public record TickResult(GameInfo game, List<GameDomainEvent> events) {
}
