package com.antswar.backend.game.infrastructure.websocket;


import com.antswar.backend.game.application.port.out.request.ChatInfo;
import com.antswar.backend.game.application.port.out.ChatPublisher;
import com.antswar.backend.game.application.port.out.GameEventPublisher;
import com.antswar.backend.game.application.port.out.request.GameEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class Publisher implements GameEventPublisher, ChatPublisher {
    private final SimpMessagingTemplate messagingTemplate;
    private static final String GAME_TOPIC = "/topic/game/%d";
    private static final String CHAT_TOPIC = "/topic/game/%d/chat";

    @Override
    public void publish(long gameId, GameEvent message) {
        messagingTemplate.convertAndSend(GAME_TOPIC.formatted(gameId), message);
    }

    @Override
    public void publish(long gameId, ChatInfo chat) {
        messagingTemplate.convertAndSend(CHAT_TOPIC.formatted(gameId), chat);
    }
}
