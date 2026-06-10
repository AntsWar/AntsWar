package com.antswar.backend.game.application.port.out;

import com.antswar.backend.game.application.dto.PlayerEvent;

public interface PlayerPublisher {
    void publish(PlayerEvent event);
}
