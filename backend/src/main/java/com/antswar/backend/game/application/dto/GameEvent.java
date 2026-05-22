package com.antswar.backend.game.application.dto;

public record GameEvent(long gameId, String type, Object payload) {
}
