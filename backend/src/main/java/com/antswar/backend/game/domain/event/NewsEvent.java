package com.antswar.backend.game.domain.event;

import com.antswar.backend.game.domain.news.NewsMeta;

public record NewsEvent(NewsMeta meta) implements GameDomainEvent {
}
