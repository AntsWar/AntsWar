package com.antswar.backend.game.infrastructure.websocket;

import com.antswar.backend.game.application.port.in.room.LeaveRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class RoomEventListener {
    private final LeaveRoom leaveRoom;

    @EventListener
    public void handleDisconnect(SessionDisconnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());

        Map<String, Object> attrs = accessor.getSessionAttributes();

        if (attrs == null) return;

        String roomId = (String) attrs.get("roomId");
        String playerId = (String) attrs.get("playerId");

        if (roomId == null || playerId == null) return;

        leaveRoom.leave(roomId, playerId);
    }
}