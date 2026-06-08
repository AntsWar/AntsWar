package com.antswar.backend.exception;

import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Arrays;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    protected ResponseEntity<ErrorResponse> handleBusinessException(BusinessException e) {
        ErrorCode errorCode = e.getErrorCode();
        log.warn("businessException code={}, msg={}", errorCode.getCode(), e.getMessage());
        return ResponseEntity
                .status(BAD_REQUEST)
                .body(new ErrorResponse(errorCode.getCode(), e.getMessage()));
    }

    @ExceptionHandler({
            MethodArgumentNotValidException.class,
            ConstraintViolationException.class,
            IllegalArgumentException.class
    })
    protected ResponseEntity<ErrorResponse> handleBadRequestException(Exception e) {
        log.warn("badRequestException", e);

        ErrorResponse response = createBadRequestResponse(e);
        return ResponseEntity
                .status(BAD_REQUEST)
                .body(response);
    }

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<ErrorResponse> handleInternalException(Exception e) {
        log.error("internalException msg={}", e.getMessage(), e);

        return ResponseEntity
                .status(INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("INTERNAL_SERVER_ERROR", ""));
    }

    private ErrorResponse createBadRequestResponse(Exception e) {
        if (e instanceof MethodArgumentNotValidException ex) {
            return new ErrorResponse("INVALID_VALUE", ex.getBindingResult());
        }

        return new ErrorResponse("INVALID_VALUE", e.getMessage());
    }
}