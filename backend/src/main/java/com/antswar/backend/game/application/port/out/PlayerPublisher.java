package com.antswar.backend.game.application.port.out;

public interface PlayerPublisher {
    void publish(long playerId,String destination, Object payload);
}
