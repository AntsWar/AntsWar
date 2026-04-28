package com.antswar.backend.game.application.port.out.request;

public record RoomEvent(RoomEventType type, Object payload) {
}