package com.antswar.backend.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
public enum GlobalErrorCode implements ErrorCode {
    UNAUTHORIZED,
    LOCK_TIME_OUT,
    ;
}
