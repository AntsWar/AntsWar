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

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyMMddHHmm");

    public long previousGameId() {
        return toGameId(currentSlot().minusMinutes(30));
    }

    public long currentGameId() {
        return toGameId(currentSlot());
    }

    private ZonedDateTime currentSlot() {
        ZonedDateTime now = ZonedDateTime.now(clock);

        return now
                .withMinute(now.getMinute() < 30 ? 0 : 30)
                .withSecond(0)
                .withNano(0);
    }

    private long toGameId(ZonedDateTime time) {
        return Long.parseLong(time.format(FORMATTER));
    }
}