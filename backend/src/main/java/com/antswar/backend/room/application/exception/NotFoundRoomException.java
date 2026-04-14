package com.antswar.backend.room.application.exception;

import com.antswar.backend.exception.BusinessException;

import static com.antswar.backend.room.application.exception.RoomErrorCode.API_ERROR_ROOM_NOT_FOUND;

public class NotFoundRoomException extends BusinessException {
    public NotFoundRoomException() {
        super(API_ERROR_ROOM_NOT_FOUND);
    }
}
