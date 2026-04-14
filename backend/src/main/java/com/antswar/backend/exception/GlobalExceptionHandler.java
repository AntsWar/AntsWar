package com.antswar.backend.exception;

import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import static com.antswar.backend.exception.GlobalErrorCode.*;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    protected ResponseEntity<ErrorResponse> handleBusinessException(BusinessException e) {
        ErrorCode errorCode = e.getErrorCode();

        log.warn("BusinessException code={}, msg={}", errorCode, e.getMessage(), e);

        ErrorResponse response = new ErrorResponse(errorCode);
        return ResponseEntity.status(errorCode.getStatus()).body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        log.warn("Validation failed msg={}", e.getMessage());

        ErrorResponse response = new ErrorResponse(API_ERROR_INPUT_INVALID_VALUE, e.getBindingResult());
        return ResponseEntity.status(API_ERROR_INPUT_INVALID_VALUE.getStatus()).body(response);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> handleConstraintViolation(ConstraintViolationException e) {
        log.warn("ConstraintViolation failed msg={}", e.getMessage());

        ErrorResponse response = new ErrorResponse(e.getMessage());
        return ResponseEntity.status(API_ERROR_INPUT_INVALID_VALUE.getStatus()).body(response);
    }

    @ExceptionHandler(NoResourceFoundException.class)
    protected ResponseEntity<ErrorResponse> handleException(NoResourceFoundException e) {
        log.warn("noResourceFoundException msg={}",e.getMessage());
        ErrorResponse response = new ErrorResponse(API_ERROR_NO_RESOURCE_FOUND);
        return ResponseEntity.status(API_ERROR_NO_RESOURCE_FOUND.getStatus()).body(response);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDuplicate(DataIntegrityViolationException e) {
        log.warn("DataIntegrityViolationException msg={}", e.getMessage());
        ErrorResponse response = new ErrorResponse(API_ERROR_DUPLICATED);

        return ResponseEntity.status(API_ERROR_DUPLICATED.getStatus()).body(response);
    }

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<ErrorResponse> handleException(Exception e) {
        log.warn("defaultException mgs={}",e.getMessage(),e);
        ErrorResponse response = new ErrorResponse(API_ERROR_INTERNAL_SERVER_ERROR);
        return ResponseEntity.status(500).body(response);
    }
}