package com.antswar.backend.game.application.port.out;

import com.antswar.backend.game.application.dto.ChatInfo;

public interface ChatPublisher {
    void publish(long gameId, ChatInfo chat);
}
