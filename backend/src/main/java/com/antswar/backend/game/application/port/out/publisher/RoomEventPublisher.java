package com.antswar.backend.game.application.port.out.publisher;

public interface RoomEventPublisher {
    void publish(String roomId, RoomEvent message);
}
