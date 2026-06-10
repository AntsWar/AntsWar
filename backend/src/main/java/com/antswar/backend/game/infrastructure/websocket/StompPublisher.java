package com.antswar.backend.game.infrastructure.websocket;


import com.antswar.backend.game.application.GameIdPolicy;
import com.antswar.backend.game.application.dto.ChatInfo;
import com.antswar.backend.game.application.dto.PlayerEvent;
import com.antswar.backend.game.application.port.out.ChatPublisher;
import com.antswar.backend.game.application.port.out.GamePublisher;
import com.antswar.backend.game.application.port.out.PlayerPublisher;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StompPublisher implements GamePublisher, ChatPublisher, PlayerPublisher {
    private final SimpMessagingTemplate messagingTemplate;
    private final GameIdPolicy gameIdPolicy;

    private static final String PLAYER_TOPIC = "/queue";
    private static final String GAME_TOPIC = "/topic/game/%d";
    private static final String CHAT_TOPIC = "/topic/game/%d/chat";

    @Override
    public void publish(String type, Object payload) {
        long gameId = gameIdPolicy.currentGameId();
        publish(gameId, type, payload);
    }

    @Override
    public void publish(long gameId, String type, Object payload) {
        messagingTemplate.convertAndSend(GAME_TOPIC.formatted(gameId), new Message(type, payload));
    }

    @Override
    public void publish(ChatInfo chat) {
        long gameId = gameIdPolicy.currentGameId();
        publish(gameId, chat);
    }

    @Override
    public void publish(long gameId, ChatInfo chat) {
        messagingTemplate.convertAndSend(CHAT_TOPIC.formatted(gameId), chat);
    }

    @Override
    public void publish(PlayerEvent event) {
        messagingTemplate.convertAndSendToUser(
                String.valueOf(event.playerId()),
                PLAYER_TOPIC+event.destination(),
                new Message(event.type(), event.payload()));
    }


    record Message(String type, Object payload) {
    }
}