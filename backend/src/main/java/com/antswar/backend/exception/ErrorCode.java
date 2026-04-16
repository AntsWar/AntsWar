package com.antswar.backend.exception;

public interface ErrorCode {
    default String getCode() {
        return ((Enum<?>) this).name();
    }
}