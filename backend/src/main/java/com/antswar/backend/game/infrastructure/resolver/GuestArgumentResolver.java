package com.antswar.backend.game.infrastructure.resolver;

import com.antswar.backend.common.annotation.Auth;
import com.antswar.backend.exception.GlobalErrorCode;
import com.antswar.backend.exception.GlobalException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
public class GuestArgumentResolver implements HandlerMethodArgumentResolver {

    private static final String GUEST_ID_COOKIE = "GUEST_ID";
    private static final String GUEST_NAME_COOKIE = "GUEST_NAME";

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
            WebDataBinderFactory binderFactory) {
        Auth annotation = parameter.getParameterAnnotation(Auth.class);

        HttpServletRequest request = webRequest.getNativeRequest(HttpServletRequest.class);
        String guestId = extractCookieValue(request, GUEST_ID_COOKIE);
        String guestName = extractCookieValue(request, GUEST_NAME_COOKIE);

        boolean required = annotation == null || annotation.required();

        if (guestId == null || guestName == null) {
            if (!required) {
                return null;
            }
            throw new GlobalException(GlobalErrorCode.UNAUTHORIZED);
        }

        return new PlayerPrincipal(guestId, guestName);
    }

    private String extractCookieValue(HttpServletRequest request, String cookieName) {
        if (request == null || request.getCookies() == null) {
            return null;
        }

        for (Cookie cookie : request.getCookies()) {
            if (cookieName.equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }
}
