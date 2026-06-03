package com.antswar.backend.game.domain.news;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Clock;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RequiredArgsConstructor
@Component
public class NoticeManager {
    private final Map<Long, LocalDateTime> radarExpiredAt = new ConcurrentHashMap<>();
    private final Clock clock;
    private static final Duration duration = Duration.ofMinutes(5);

    public void activate(long playerId) {
        radarExpiredAt.put(playerId, LocalDateTime.now(clock).plus(duration));
    }

    public boolean hasRadar(long playerId) {
        LocalDateTime expiredAt = radarExpiredAt.get(playerId);

        if (expiredAt == null) {
            return false;
        }

        if (expiredAt.isBefore(LocalDateTime.now(clock))) {
            radarExpiredAt.remove(playerId);
            return false;
        }

        return true;
    }

    public LocalDateTime getExpiredAt(long playerId){
        return radarExpiredAt.get(playerId);
    }
}
