package com.antswar.backend.game.application;

import com.antswar.backend.game.application.dto.PurchaseMetaInfo;
import com.antswar.backend.game.application.dto.TickResult;
import com.antswar.backend.game.application.port.out.GameEventPublisher;
import com.antswar.backend.game.application.port.out.GameRepository;
import com.antswar.backend.game.application.port.out.request.GameEvent;
import com.antswar.backend.game.application.port.out.request.GameEventType;
import com.antswar.backend.game.application.dto.GameInfo;
import com.antswar.backend.game.domain.event.GameDomainEvent;
import com.antswar.backend.game.domain.event.NewsEvent;
import com.antswar.backend.game.domain.event.PurchaseDelistedEvent;
import com.antswar.backend.game.domain.game.Game;
import com.antswar.backend.game.exception.GameException;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Clock;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import static com.antswar.backend.game.application.port.out.request.GameEventType.GAME_FINISHED;
import static com.antswar.backend.game.exception.GameErrorCode.GAME_NOT_FOUND;

@Component
@RequiredArgsConstructor
public class GameScheduler {
    private final GameEventPublisher gameEventPublisher;
    private final GameRepository gameRepository;
    private final GameService gameService;
    private final TaskScheduler taskScheduler;
    private final Clock clock;

    @Scheduled(cron = "0/5 * * * * *")
    void tickGame() {
        TickResult result = gameService.tick(clock.instant());
        publishGame(result.game());
        result.events().forEach(event->
                publishEvent(result.game().id(), event)
        );
    }

    @Scheduled(cron = "0 59 * * * *")
    public void scheduleEnd() {
        Game game = gameRepository.findCurrentGame(clock.instant()).orElseThrow(()-> new GameException(GAME_NOT_FOUND));
        taskScheduler.schedule(() -> publishFinished(game.getId()), game.getEndedAt());
    }

    void publishGame(GameInfo game) {
        gameEventPublisher.publish(game.id(), new GameEvent(GameEventType.GAME_UPDATED, game));
    }

    void publishFinished(long id){
        gameEventPublisher.publish(id, new GameEvent(GAME_FINISHED, null));
    }

    void publishEvent(long id, GameDomainEvent event) {
        if (event instanceof PurchaseDelistedEvent e) {
            gameEventPublisher.publish(
                    id,
                    new GameEvent(GameEventType.PURCHASE_DELIST, PurchaseMetaInfo.from(e.meta()))
            );
        }else if(event instanceof NewsEvent e){
            gameEventPublisher.publish(
                    id,
                    new GameEvent(GameEventType.NOTICE, e.meta().getCode())
            );
        }
    }
}
