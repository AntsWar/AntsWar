package com.antswar.backend.game.application.port.out;

import com.antswar.backend.game.application.port.out.request.GameEvent;

public interface GameEventPublisher {
    void publish(long gameId, GameEvent message);
}
