package com.antswar.backend.game.application.port.in.room;

public interface LeaveRoom {
    void leave(String roomId, String playerId);
}
