package com.antswar.backend.game.infrastructure.scheduler;

import com.antswar.backend.game.application.TickProcessor;
import com.antswar.backend.game.application.port.out.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Clock;

@Component
@RequiredArgsConstructor
public class GameScheduler {
    private final TickProcessor tickProcessor;
    private final Clock clock;

    @Scheduled(cron = "0/5 * * * * *")
    protected void tickGame() {
        tickProcessor.tick(clock.instant());
    }
}
