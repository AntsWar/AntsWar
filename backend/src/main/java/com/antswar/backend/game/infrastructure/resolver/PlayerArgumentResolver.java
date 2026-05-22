package com.antswar.backend.game.infrastructure.resolver;

import com.antswar.backend.common.annotation.Auth;
import com.antswar.backend.exception.GlobalErrorCode;
import com.antswar.backend.exception.GlobalException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
public class PlayerArgumentResolver implements HandlerMethodArgumentResolver {

    private static final String PLAYER_ID_SESSION_KEY = "playerId";

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(Auth.class)
                && parameter.getParameterType().equals(PlayerPrincipal.class);
    }

    @Override
    public Object resolveArgument(
            MethodParameter parameter,
            ModelAndViewContainer mavContainer,
            NativeWebRequest webRequest,
            WebDataBinderFactory binderFactory
    ) {
        Auth annotation = parameter.getParameterAnnotation(Auth.class);

        HttpServletRequest request =
                webRequest.getNativeRequest(HttpServletRequest.class);

        boolean required = annotation == null || annotation.required();

        Long playerId = extractPlayerIdFromSession(request);

        if (playerId == null) {
            if (!required) {
                return null;
            }

            throw new GlobalException(GlobalErrorCode.UNAUTHORIZED);
        }

        return new PlayerPrincipal(playerId);
    }

    private Long extractPlayerIdFromSession(HttpServletRequest request) {
        if (request == null) {
            return null;
        }

        HttpSession session = request.getSession(false);

        if (session == null) {
            return null;
        }

        Object value = session.getAttribute(PLAYER_ID_SESSION_KEY);

        if (value instanceof Long playerId) {
            return playerId;
        }

        if (value instanceof Number number) {
            return number.longValue();
        }

        if (value instanceof String string && !string.isBlank()) {
            return Long.parseLong(string);
        }

        return null;
    }
}