package com.antswar.backend.game.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Clock;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@RequiredArgsConstructor
@Component
public class GameIdPolicy {
    private final Clock clock;
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyMMddHH");

    public long previousGameId() {
        return Long.parseLong(
                ZonedDateTime.now(clock)
                        .minusHours(1)
                        .format(FORMATTER)
        );
    }

    public long currentGameId() {
        return Long.parseLong(
                ZonedDateTime.now(clock)
                        .format(FORMATTER)
        );
    }

    public long nextGameId() {
        return Long.parseLong(
                ZonedDateTime.now(clock)
                        .plusHours(1)
                        .format(FORMATTER)
        );
    }
}