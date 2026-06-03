package com.antswar.backend.game.infrastructure.websocket;

import com.antswar.backend.exception.GlobalErrorCode;
import com.antswar.backend.exception.GlobalException;
import com.antswar.backend.game.application.dto.StompPrincipal;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.Map;

@Component
public class GameHandshakeHandler extends DefaultHandshakeHandler {

    @Override
    protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler, Map<String, Object> attributes) {
        if (!(request instanceof ServletServerHttpRequest servletRequest)) {
            throw new GlobalException(GlobalErrorCode.UNAUTHORIZED);
        }

        HttpSession session = servletRequest.getServletRequest().getSession(false);

        if (session == null) {
            throw new GlobalException(GlobalErrorCode.UNAUTHORIZED);
        }

        Long playerId = (Long) session.getAttribute("playerId");
        String playerName = (String) session.getAttribute("playerName");

        if (playerId == null || playerName == null) {
            throw new GlobalException(GlobalErrorCode.UNAUTHORIZED);
        }

        return new StompPrincipal(playerId, playerName);
    }
}