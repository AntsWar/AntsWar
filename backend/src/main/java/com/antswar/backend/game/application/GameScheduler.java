package com.antswar.backend.game.application;

import com.antswar.backend.game.application.dto.PurchaseMetaInfo;
import com.antswar.backend.game.application.port.out.RoomRepository;
import com.antswar.backend.game.application.port.out.RoomEventPublisher;
import com.antswar.backend.game.application.port.out.request.RoomEvent;
import com.antswar.backend.game.application.port.out.request.RoomEventType;
import com.antswar.backend.game.application.dto.GameInfo;
import com.antswar.backend.game.domain.event.GameDomainEvent;
import com.antswar.backend.game.domain.event.GameStartedEvent;
import com.antswar.backend.game.domain.event.NewsEvent;
import com.antswar.backend.game.domain.event.PurchaseDelistedEvent;
import com.antswar.backend.game.domain.room.Room;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Clock;
import java.time.Instant;
import java.util.List;

@Component
@RequiredArgsConstructor
public class GameScheduler {
    private final RoomRepository roomRepository;
    private final RoomEventPublisher roomEventPublisher;
    private final RoomService roomService;
    private final Clock clock;

    @Scheduled(fixedRate = 5000)
    void tickGame() {
        List<String> roomIds = roomRepository.findAllNotFinishedIds();
        Instant now = clock.instant();
        roomIds.forEach(roomId-> {
            var result = roomService.tick(roomId, now);
            publishGame(roomId, result.game());
            result.events().forEach(event -> publishEvent(roomId, event));
        });
    }
    void publishGame(String roomId, GameInfo game) {
        roomEventPublisher.publish(roomId, new RoomEvent(RoomEventType.ROOM_UPDATED, game));
    }

    void publishEvent(String roomId, GameDomainEvent event) {
        if (event instanceof PurchaseDelistedEvent e) {
            roomEventPublisher.publish(
                    roomId,
                    new RoomEvent(RoomEventType.PURCHASE_DELIST, PurchaseMetaInfo.from(e.meta()))
            );
        }else if(event instanceof NewsEvent e){
            roomEventPublisher.publish(
                    roomId,
                    new RoomEvent(RoomEventType.NOTICE, e.meta().getCode())
            );
        }else if(event instanceof GameStartedEvent){
            roomEventPublisher.publish(
                    roomId,
                    new RoomEvent(RoomEventType.GAME_STARTED, null)
            );
        }
    }
}
