package com.antswar.backend.game.exception;

import com.antswar.backend.exception.ErrorCode;
import lombok.Getter;

@Getter
public enum GameErrorCode implements ErrorCode {
    GAME_NOT_FOUND,
    GAME_FULL,
    GAME_INVALID_PASSWORD,
    GAME_NOT_READY,
    GAME_FORBIDDEN,
    GAME_FINISHED,

    MONEY_NOT_ENOUGH,

    PLAYER_NOT_OWNED,
    PLAYER_NOT_FOUND,

    POSITION_NOT_ENOUGH_QUANTITY,

    MARKET_NOT_FOUND,
    MARKET_PURCHASE_NOT_FOUND,
    ;
}
