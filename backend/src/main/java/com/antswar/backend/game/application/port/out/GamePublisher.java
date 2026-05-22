package com.antswar.backend.game.application.port.out;

public interface GamePublisher {
    void publish(long gameId, String type, Object payload);
}
