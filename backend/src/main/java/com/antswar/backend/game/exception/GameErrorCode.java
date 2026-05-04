package com.antswar.backend.game.exception;

import com.antswar.backend.exception.ErrorCode;
import lombok.Getter;

@Getter
public enum GameErrorCode implements ErrorCode {
    ROOM_NOT_FOUND,
    ROOM_FULL,
    ROOM_REQUIRE_PASSWORD,
    ROOM_INVALID_PASSWORD,

    GAME_NOT_FOUND,
    GAME_NOT_WAITING,
    GAME_NOT_RUNNING,
    GAME_FORBIDDEN,
    GAME_FINISHED,

    PLAYER_NOT_FOUND,
    PLAYER_NOT_ENOUGH_MONEY,

    POSITION_NOT_ENOUGH_QUANTITY,

    PURCHASE_NOT_FOUND,
    PURCHASE_DELISTED,
    ;
}
