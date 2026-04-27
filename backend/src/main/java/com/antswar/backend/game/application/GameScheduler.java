package com.antswar.backend.game.application;

import com.antswar.backend.game.application.dto.PurchaseMetaInfo;
import com.antswar.backend.game.application.port.out.persistence.RoomRepository;
import com.antswar.backend.game.application.port.out.publisher.RoomEventPublisher;
import com.antswar.backend.game.application.port.out.publisher.RoomEvent;
import com.antswar.backend.game.application.port.out.publisher.RoomEventType;
import com.antswar.backend.game.application.dto.GameInfo;
import com.antswar.backend.game.domain.event.GameDomainEvent;
import com.antswar.backend.game.domain.event.NewsEvent;
import com.antswar.backend.game.domain.event.PurchaseDelistedEvent;
import com.antswar.backend.game.domain.news.NewsGenerator;
import com.antswar.backend.game.domain.room.Room;
import com.antswar.backend.game.domain.room.RoomStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.Instant;
import java.util.List;

@Component
@RequiredArgsConstructor
@Transactional
public class GameScheduler {
    private final RoomRepository roomRepository;
    private final RoomEventPublisher roomEventPublisher;
    private final NewsGenerator newsGenerator;
    private final Clock clock;

    @Scheduled(fixedRate = 5000)
    void tickGame() {
        List<Room> rooms = roomRepository.findAllNotFinished();
        Instant now = clock.instant();
        rooms.forEach(room-> {
            if(room.getStatus() == RoomStatus.READY){
                room.getGame().start(now);
                publishGameStarted(room);
            }else if(room.getStatus() == RoomStatus.RUNNING){
                room.finishIfEnded(now);
                if(room.getStatus() == RoomStatus.RUNNING) {
                    List<GameDomainEvent> events = room.getGame().tick(newsGenerator);
                    events.forEach(event -> publishEvent(room, event));
                }
            }
            publishGame(room, now);
        });
    }

    void publishGameStarted(Room room) {
        roomEventPublisher.publish(room.getId(),
                new RoomEvent(RoomEventType.GAME_STARTED, null));
    }

    void publishGame(Room room, Instant now) {
        roomEventPublisher.publish(room.getId(),
                new RoomEvent(RoomEventType.ROOM_UPDATED, GameInfo.of(room, now))
        );
    }

    void publishEvent(Room room, GameDomainEvent event) {
        if (event instanceof PurchaseDelistedEvent e) {
            roomEventPublisher.publish(
                    room.getId(),
                    new RoomEvent(RoomEventType.PURCHASE_DELIST, PurchaseMetaInfo.from(e.meta()))
            );
        }else if(event instanceof NewsEvent e){
            roomEventPublisher.publish(
                    room.getId(),
                    new RoomEvent(RoomEventType.NOTICE, e.meta().getCode())
            );
        }
    }
}
