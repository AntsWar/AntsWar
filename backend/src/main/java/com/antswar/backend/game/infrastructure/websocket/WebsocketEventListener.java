package com.antswar.backend.game.infrastructure.websocket;

import com.antswar.backend.game.application.dto.StompPrincipal;
import com.antswar.backend.game.application.port.in.LeaveGame;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.security.Principal;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class WebsocketEventListener {
    private final LeaveGame leaveGame;

    @EventListener
    public void handleDisconnect(SessionDisconnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        Principal principal = accessor.getUser();

        if (!(principal instanceof StompPrincipal stompPrincipal)) {
            return;
        }

        leaveGame.leave(stompPrincipal.playerId());
    }
}