package com.antswar.backend.game.application.dto;

public record PlayerEvent(long playerId, String destination, String type, Object payload) {
    public PlayerEvent {
        destination = destination == null ? "" : destination;
    }

    public PlayerEvent(long playerId, String type){
        this(playerId, null, type, null);
    }
}
