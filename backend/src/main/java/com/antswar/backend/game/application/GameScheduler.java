package com.antswar.backend.game.application;

import com.antswar.backend.game.application.dto.PurchaseMetaInfo;
import com.antswar.backend.game.application.dto.TickResult;
import com.antswar.backend.game.application.port.out.GameEventPublisher;
import com.antswar.backend.game.application.port.out.request.GameEvent;
import com.antswar.backend.game.application.port.out.request.GameEventType;
import com.antswar.backend.game.application.dto.GameInfo;
import com.antswar.backend.game.domain.event.GameDomainEvent;
import com.antswar.backend.game.domain.event.NewsEvent;
import com.antswar.backend.game.domain.event.PurchaseDelistedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Clock;

@Component
@RequiredArgsConstructor
public class GameScheduler {
    private final GameEventPublisher roomGameEventPublisher;
    private final GameService gameService;
    private final Clock clock;

    @Scheduled(cron = "0/5 * * * * *")
    void tickGame() {
        TickResult result = gameService.tick(clock.instant());
        publishGame(result.game());
        result.events().forEach(event->
                publishEvent(result.game().id(), event)
        );
    }

    void publishGame(GameInfo game) {
        roomGameEventPublisher.publish(game.id(), new GameEvent(GameEventType.GAME_UPDATED, game));
    }

    void publishEvent(long id, GameDomainEvent event) {
        if (event instanceof PurchaseDelistedEvent e) {
            roomGameEventPublisher.publish(
                    id,
                    new GameEvent(GameEventType.PURCHASE_DELIST, PurchaseMetaInfo.from(e.meta()))
            );
        }else if(event instanceof NewsEvent e){
            roomGameEventPublisher.publish(
                    id,
                    new GameEvent(GameEventType.NOTICE, e.meta().getCode())
            );
        }
    }
}
