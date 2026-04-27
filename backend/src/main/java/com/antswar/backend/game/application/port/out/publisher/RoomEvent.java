package com.antswar.backend.game.application.port.out.publisher;

public record RoomEvent(RoomEventType type, Object payload) {
}