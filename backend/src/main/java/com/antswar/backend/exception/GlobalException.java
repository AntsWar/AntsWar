package com.antswar.backend.exception;

public class GlobalException extends BusinessException {
    public GlobalException(ErrorCode errorCode) {
        super(errorCode);
    }
    public GlobalException(ErrorCode errorCode, String message) {
        super(errorCode, message);
    }
}
