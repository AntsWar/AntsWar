package com.antswar.backend.game.exception;

import com.antswar.backend.exception.BusinessException;
import com.antswar.backend.exception.ErrorCode;

public class GameException extends BusinessException {
    public GameException(ErrorCode errorCode) {
        super(errorCode);
    }
}
