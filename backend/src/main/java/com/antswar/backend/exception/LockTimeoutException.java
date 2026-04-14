package com.antswar.backend.exception;

import static com.antswar.backend.exception.GlobalErrorCode.API_ERROR_TIME_OUT;

public class LockTimeoutException extends BusinessException {

    public LockTimeoutException(Object key, int timeoutSeconds) {
        super(API_ERROR_TIME_OUT,"락획득 실패.key=" + key + " within " + timeoutSeconds + "s");
    }
}
