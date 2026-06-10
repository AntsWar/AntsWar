package com.antswar.backend.game.infrastructure.websocket;

import com.antswar.backend.game.application.dto.StompPrincipal;
import com.antswar.backend.game.application.port.in.LeaveGame;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

import java.security.Principal;
import java.util.Map;

@Slf4j
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


        @EventListener
        public void handle(SessionConnectEvent event) {
            StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());

            Principal principal = accessor.getUser();

            log.info("STOMP connected. principal={}",
                    principal == null ? null : principal.getName());
        }

        @EventListener
        public void handle(SessionSubscribeEvent event) {
            StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());

            log.info("STOMP subscribe. user={}, destination={}",
                    accessor.getUser() == null ? null : accessor.getUser().getName(),
                    accessor.getDestination());
        }

}