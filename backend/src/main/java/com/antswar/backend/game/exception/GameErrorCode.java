package com.antswar.backend.game.exception;

import com.antswar.backend.exception.ErrorCode;
import lombok.Getter;

@Getter
public enum GameErrorCode implements ErrorCode {
    GAME_NOT_FOUND,

    PLAYER_NOT_FOUND,
    PLAYER_NOT_ENOUGH_MONEY,
    PLAYER_MUST_HAVE_NAME,

    POSITION_NOT_ENOUGH_QUANTITY,
    POSITION_MUST_AT_LEAST_1_QUANTITY,
    POSITION_NOT_PLAYERS,

    PURCHASE_NOT_FOUND,
    PURCHASE_DELISTED,
    PURCHASE_MUST_AT_LEAST_1_QUANTITY,
    UNSUPPORTED_ITEM,
    ;
}
