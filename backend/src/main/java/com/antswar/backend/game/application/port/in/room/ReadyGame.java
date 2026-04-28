package com.antswar.backend.game.application.port.in.room;

public interface ReadyGame {
    void ready(String roomId, String hostId);
}
