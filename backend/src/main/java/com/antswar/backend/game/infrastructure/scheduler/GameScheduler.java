package com.antswar.backend.game.infrastructure.scheduler;

import com.antswar.backend.game.application.GameIdPolicy;
import com.antswar.backend.game.application.TickProcessor;
import com.antswar.backend.game.application.port.out.GamePublisher;
import com.antswar.backend.game.domain.news.NewsBoard;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GameScheduler {
    private final TickProcessor tickProcessor;
    private final GamePublisher gamePublisher;
    private final GameIdPolicy gameIdPolicy;
    private final NewsBoard newsBoard;

    @Scheduled(cron = "0/5 * * * * *")
    protected void tickGame() {
        tickProcessor.tick(gameIdPolicy.currentGameId());
    }

    @Scheduled(cron = "0 0 * * * *")
    protected void finishedGame() {
        newsBoard.reset();
        gamePublisher.publish(gameIdPolicy.previousGameId(), "FINISHED", null);
    }
}