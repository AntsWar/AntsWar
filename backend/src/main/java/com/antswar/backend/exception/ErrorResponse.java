package com.antswar.backend.exception;


import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class ErrorResponse {
    private final String code;
    private String message;
    private List<FieldError> errors;

    public ErrorResponse(final String code, String message) {
        this.code = code;
        this.message = message;
    }

    public ErrorResponse(final String code, final BindingResult bindingResult) {
        this.code = code;
        this.errors = FieldError.of(bindingResult);
    }

    @Getter
    @AllArgsConstructor
    public static class FieldError {
        private String field;
        private String value;
        private String reason;

        private static List<FieldError> of(final BindingResult bindingResult) {
            final List<org.springframework.validation.FieldError> fieldErrors =
                    bindingResult.getFieldErrors();
            return fieldErrors.stream()
                    .map(
                            error ->
                                    new FieldError(
                                            error.getField(),
                                            error.getRejectedValue() == null ? "" : error.getRejectedValue().toString(),
                                            error.getDefaultMessage()))
                    .collect(Collectors.toList());
        }
    }
}
