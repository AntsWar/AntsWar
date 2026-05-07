package com.antswar.backend.game.application.port.out;

import com.antswar.backend.game.application.port.out.request.ChatInfo;

public interface ChatPublisher {
    void publish(long gameId, ChatInfo chat);
}
