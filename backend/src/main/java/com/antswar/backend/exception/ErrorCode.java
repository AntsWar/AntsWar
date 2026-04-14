package com.antswar.backend.exception;

public interface ErrorCode {
    int getStatus();
    String getMessage();
}