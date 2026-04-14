package com.antswar.backend.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@RequiredArgsConstructor
@Getter
public enum GlobalErrorCode implements ErrorCode {
    API_ERROR_INTERNAL_SERVER_ERROR(INTERNAL_SERVER_ERROR, "서버 오류 발생. 잠시 후 다시 시도해주세요."),
    API_ERROR_NO_RESOURCE_FOUND(NOT_FOUND,"잘못된 URL. 다시 한번 확인해주세요"),
    API_ERROR_TIME_OUT(BAD_REQUEST, "서버에 많은 요청 발생. 잠시 후 다시 시도해주세요."),
    API_ERROR_INPUT_INVALID_VALUE(BAD_REQUEST , "잘못된 입력"),
    API_ERROR_DUPLICATED(BAD_REQUEST,"데이터 중복. 재시도 요청"),
    API_ERROR_UNAUTHENTICATED(UNAUTHORIZED, "인증되지않은 회원")
    ;

    GlobalErrorCode(HttpStatus status, String message){
        this.status = status.value();
        this.message = message;
    }

    private final int status;
    private final String message;
}
