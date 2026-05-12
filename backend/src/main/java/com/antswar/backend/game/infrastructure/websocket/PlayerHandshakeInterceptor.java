package com.antswar.backend.game.infrastructure.websocket;

import jakarta.servlet.http.Cookie;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Component
public class PlayerHandshakeInterceptor implements HandshakeInterceptor {
    public static final String PLAYER_ID = "playerId";
    public static final String PLAYER_NAME = "playerName";

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) {
        if (!(request instanceof ServletServerHttpRequest servletRequest)) {
            return true;
        }

        Cookie[] cookies = servletRequest.getServletRequest().getCookies();
        if (cookies == null) {
            return true;
        }
        
        for (Cookie cookie : cookies) {
            switch (cookie.getName()) {
                case PLAYER_ID -> attributes.put(PLAYER_ID, Long.parseLong(cookie.getValue()));
                case PLAYER_NAME -> attributes.put(PLAYER_NAME, URLDecoder.decode(cookie.getValue(), StandardCharsets.UTF_8));
                default -> {
                }
            }
        }

        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {}
}