package com.antswar.backend.exception;

import static com.antswar.backend.exception.GlobalErrorCode.API_ERROR_UNAUTHENTICATED;

public class UnauthenticatedException extends BusinessException {
    public UnauthenticatedException(String message) {
        super(API_ERROR_UNAUTHENTICATED, message);

    }
}
