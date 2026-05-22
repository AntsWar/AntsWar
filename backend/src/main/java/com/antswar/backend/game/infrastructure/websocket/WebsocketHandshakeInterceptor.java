package com.antswar.backend.game.infrastructure.websocket;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

import static org.springframework.util.StringUtils.hasText;

@Component
public class WebsocketHandshakeInterceptor implements HandshakeInterceptor {

    @Override
    public boolean beforeHandshake(
            ServerHttpRequest request,
            ServerHttpResponse response,
            WebSocketHandler wsHandler,
            Map<String, Object> attributes
    ) {
        ServletServerHttpRequest servletRequest =
                (ServletServerHttpRequest) request;

        HttpSession httpSession =
                servletRequest.getServletRequest().getSession(false);

        if (httpSession == null) {
            return false;
        }

        Long playerId = (Long) httpSession.getAttribute("playerId");
        String playerName = (String) httpSession.getAttribute("playerName");

        if (playerId == null || !hasText(playerName)) {
            return false;
        }

        attributes.put("playerId", playerId);
        attributes.put("playerName", playerName);

        return true;
    }

    @Override
    public void afterHandshake(
            ServerHttpRequest request,
            ServerHttpResponse response,
            WebSocketHandler wsHandler,
            Exception exception
    ) {
    }
}