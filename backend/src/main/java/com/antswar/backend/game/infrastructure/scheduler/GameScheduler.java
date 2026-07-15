package com.antswar.backend.game.infrastructure.scheduler;

import com.antswar.backend.game.application.GameIdPolicy;
import com.antswar.backend.game.application.PriceBoard;
import com.antswar.backend.game.application.RumorBoard;
import com.antswar.backend.game.application.TickProcessor;
import com.antswar.backend.game.application.port.out.GamePublisher;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GameScheduler {
    private final TickProcessor tickProcessor;
    private final GamePublisher gamePublisher;
    private final GameIdPolicy gameIdPolicy;
    private final PriceBoard priceBoard;
    private final RumorBoard rumorBoard;

    @Scheduled(cron = "0/3 * * * * *")
    protected void tickGame() {
        tickProcessor.tick(gameIdPolicy.currentGameId());
    }

    @Scheduled(cron = "0 */30 * * * *")
    protected void finishedGame() {
        priceBoard.reset();
        rumorBoard.reset();
        gamePublisher.publish(gameIdPolicy.previousGameId(), "FINISHED", null);
    }
}