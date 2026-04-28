package com.antswar.backend.game.application;

import com.antswar.backend.game.application.dto.GameInfo;
import com.antswar.backend.game.application.dto.RoomInfo;
import com.antswar.backend.game.application.dto.TickResult;
import com.antswar.backend.game.application.port.in.room.*;
import com.antswar.backend.game.application.port.in.room.response.JoinRoomResult;
import com.antswar.backend.game.application.port.in.room.response.RegisterRoomResult;
import com.antswar.backend.game.application.port.out.NewsGenerator;
import com.antswar.backend.game.application.port.out.RoomRepository;
import com.antswar.backend.game.application.port.in.room.request.JoinRoomCommand;
import com.antswar.backend.game.application.port.in.room.request.RegisterRoomCommand;
import com.antswar.backend.game.application.port.out.request.RoomEvent;
import com.antswar.backend.game.application.port.out.RoomEventPublisher;
import com.antswar.backend.game.application.port.out.request.RoomEventType;
import com.antswar.backend.game.domain.event.GameDomainEvent;
import com.antswar.backend.game.domain.event.GameStartedEvent;
import com.antswar.backend.game.domain.player.Player;
import com.antswar.backend.game.domain.room.Room;
import com.antswar.backend.game.domain.room.RoomStatus;
import com.antswar.backend.game.exception.GameException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import static com.antswar.backend.game.exception.GameErrorCode.ROOM_NOT_FOUND;
import static org.springframework.util.StringUtils.hasText;

@Transactional
@RequiredArgsConstructor
@Service
public class RoomService implements RegisterRoom, JoinRoom, SearchRoom, ReadyGame {
    private final RoomRepository repository;
    private final RoomEventPublisher roomEventPublisher;
    private final NewsGenerator newsGenerator;
    private final Clock clock;

    @Override
    public List<RoomInfo> search(String name) {
        List<Room> rooms = hasText(name)
                ? repository.findAllWaitingByName(name)
                : repository.findAllWaiting();
        return rooms.stream().map(RoomInfo::from).toList();
    }

    @Override
    public RegisterRoomResult register(RegisterRoomCommand command) {
        Player host = new Player(command.hostId(), command.hostName());
        Room room = repository.save(new Room(command.name(), command.password(), host.getPlayerId(), command.mode(), command.capacity()));
        room.join(host, command.password());
        return new RegisterRoomResult(room.getId());
    }

    @Override
    public JoinRoomResult join(JoinRoomCommand command) {
        Room room = repository.findByIdWithLock(command.roomId()).orElseThrow(() -> new GameException(ROOM_NOT_FOUND));
        Player player = new Player(command.playerId(), command.playerName());
        room.join(player, command.password());
        roomEventPublisher.publish(room.getId(), new RoomEvent(RoomEventType.ROOM_UPDATED, GameInfo.of(room,clock.instant())));
        return new JoinRoomResult(RoomInfo.from(room), GameInfo.of(room, clock.instant()), room.isHost(command.playerId()));
    }

    @Override
    public void ready(String roomId, String hostId) {
        Room room = repository.findById(roomId).orElseThrow(() -> new GameException(ROOM_NOT_FOUND));
        room.ready(hostId);
        roomEventPublisher.publish(roomId, new RoomEvent(RoomEventType.GAME_READY, null));
    }

    public TickResult tick(String roomId, Instant now){
        Room room = repository.findById(roomId).orElseThrow(() -> new GameException(ROOM_NOT_FOUND));
        List<GameDomainEvent> events = new ArrayList<>();

        if(room.getStatus() == RoomStatus.READY){
            room.getGame().start(now);
            events.add(new GameStartedEvent());
        }else if(room.getStatus() == RoomStatus.RUNNING){
            room.finishIfEnded(now);
            if(room.getStatus() == RoomStatus.RUNNING) {
                events.addAll(room.getGame().tick(newsGenerator));
            }
        }

        return new TickResult(GameInfo.of(room, now), events);
    }
}
