package com.antswar.backend.player.infrastructure.resolver;

import com.antswar.backend.common.annotation.CurrentPlayer;
import com.antswar.backend.exception.UnauthenticatedException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import org.springframework.web.server.ResponseStatusException;

@RequiredArgsConstructor
@Component
public class PlayerArgumentResolver implements HandlerMethodArgumentResolver {

    private static final String PLAYER_COOKIE = "PLAYER_ID";

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(CurrentPlayer.class)
                && parameter.getParameterType().equals(String.class);
    }

    @Override
    public Object resolveArgument(
            MethodParameter parameter,
            ModelAndViewContainer mavContainer,
            NativeWebRequest webRequest,
            WebDataBinderFactory binderFactory) {
         CurrentPlayer annotation = parameter.getParameterAnnotation(CurrentPlayer.class);

        HttpServletRequest request = webRequest.getNativeRequest(HttpServletRequest.class);
        String playerId = extractPlayerId(request);

        if (playerId == null) {
            if (annotation != null && !annotation.required()) {
                return null;
            }
            throw new UnauthenticatedException("PLAYER_ID is required.");

        }
        return playerId;
    }

    private String extractPlayerId(HttpServletRequest request) {
        if (request == null || request.getCookies() == null) {
            return null;
        }

        for (Cookie cookie : request.getCookies()) {
            if (PLAYER_COOKIE.equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }
}