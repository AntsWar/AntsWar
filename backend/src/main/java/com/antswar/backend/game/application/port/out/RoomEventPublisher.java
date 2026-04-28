package com.antswar.backend.game.application.port.out;

import com.antswar.backend.game.application.port.out.request.RoomEvent;

public interface RoomEventPublisher {
    void publish(String roomId, RoomEvent message);
}
