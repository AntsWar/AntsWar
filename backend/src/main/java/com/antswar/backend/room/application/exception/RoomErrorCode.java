package com.antswar.backend.room.application.exception;

import com.antswar.backend.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum RoomErrorCode implements ErrorCode {
    API_ERROR_ROOM_NOT_FOUND(400,"존재하지 않는 방")
    ;

    RoomErrorCode(HttpStatus status, String message){
        this.status = status.value();
        this.message = message;
    }

    private final int status;
    private final String message;
}
