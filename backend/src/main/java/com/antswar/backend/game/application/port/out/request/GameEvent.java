package com.antswar.backend.game.application.port.out.request;

public record GameEvent(GameEventType type, Object payload) {
}