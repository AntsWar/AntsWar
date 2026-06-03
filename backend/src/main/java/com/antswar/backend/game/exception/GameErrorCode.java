package com.antswar.backend.game.exception;

import com.antswar.backend.exception.ErrorCode;
import lombok.Getter;

@Getter
public enum GameErrorCode implements ErrorCode {
    GAME_NOT_FOUND,

    PLAYER_NOT_FOUND,
    PLAYER_NOT_ENOUGH_MONEY,

    POSITION_NOT_ENOUGH_QUANTITY,

    PURCHASE_NOT_FOUND,
    PURCHASE_DELISTED,

    INVALID_NEWS_CODE
    ;
}
