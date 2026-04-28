package com.antswar.backend.game.infrastructure.websocket;


import com.antswar.backend.game.application.port.out.RoomEventPublisher;
import com.antswar.backend.game.application.port.out.request.RoomEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RoomEventPublisherImpl implements RoomEventPublisher {
    private final SimpMessagingTemplate messagingTemplate;

    public void publish(String roomId, RoomEvent message) {
        messagingTemplate.convertAndSend("/topic/game/" + roomId, message);
    }

}
