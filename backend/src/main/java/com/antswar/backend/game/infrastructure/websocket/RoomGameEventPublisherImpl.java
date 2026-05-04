package com.antswar.backend.game.infrastructure.websocket;


import com.antswar.backend.game.application.port.out.GameEventPublisher;
import com.antswar.backend.game.application.port.out.request.GameEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RoomGameEventPublisherImpl implements GameEventPublisher {
    private final SimpMessagingTemplate messagingTemplate;

    public void publish(long gameId, GameEvent message) {
        messagingTemplate.convertAndSend("/topic/game/"+gameId, message);
    }

}
