package com.antswar.backend.game.infrastructure.websocket;


import com.antswar.backend.game.application.GameIdPolicy;
import com.antswar.backend.game.application.dto.ChatInfo;
import com.antswar.backend.game.application.port.out.ChatPublisher;
import com.antswar.backend.game.application.dto.GameEvent;
import com.antswar.backend.game.application.port.out.GamePublisher;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class StompPublisher implements GamePublisher, ChatPublisher {
    private final SimpMessagingTemplate messagingTemplate;
    private final GameIdPolicy gameIdPolicy;

    private static final String GAME_TOPIC = "/topic/game/%d";
    private static final String CHAT_TOPIC = "/topic/game/%d/chat";

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handle(GameEvent event) {
        publish(event.type(), event.payload());
    }

    @Override
    public void publish(String type, Object payload) {
        long gameId = gameIdPolicy.currentGameId();
        publish(gameId, type, payload);
    }

    @Override
    public void publish(long gameId, String type, Object payload) {
        messagingTemplate.convertAndSend(GAME_TOPIC.formatted(gameId), new GameMessage(type, payload));
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handle(ChatInfo event) {
        long gameId = gameIdPolicy.currentGameId();
        publish(gameId, event);
    }

    @Override
    public void publish(long gameId, ChatInfo chat) {
        messagingTemplate.convertAndSend(CHAT_TOPIC.formatted(gameId), chat);
    }

    record GameMessage(String type, Object payload) {
    }
}