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

    private static final String GUEST_ID_HEADER = "GUEST_ID";
    private static final String GUEST_NAME_HEADER = "GUEST_NAME";

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
        String guestId = request != null ? request.getHeader(GUEST_ID_HEADER) : null;
        String guestName = request != null ? request.getHeader(GUEST_NAME_HEADER) : null;

        boolean required = annotation == null || annotation.required();
        if (guestId == null || guestId.isBlank() || guestName == null || guestName.isBlank()) {
            if (!required) {
                return null;
            }
            throw new GlobalException(GlobalErrorCode.UNAUTHORIZED);
        }

        return new PlayerPrincipal(guestId, guestName);
    }

}
