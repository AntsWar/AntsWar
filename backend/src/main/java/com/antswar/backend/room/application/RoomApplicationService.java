package com.antswar.backend.room.application;

import com.antswar.backend.room.application.dto.*;
import com.antswar.backend.room.application.port.in.RegisterRoom;
import com.antswar.backend.room.application.port.in.SearchReadyRoom;
import com.antswar.backend.room.domain.Room;
import com.antswar.backend.room.application.port.out.RoomRepository;
import com.antswar.backend.room.domain.RoomStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class RoomApplicationService implements RegisterRoom, SearchReadyRoom {
    private final RoomRepository repository;

    @Transactional
    @Override
    public RegisterRoomResult register(RegisterRoomCommand command) {
        Room room = repository.save(Room.of(command.name(), command.password(), command.hostId(), command.mode(), command.capacity()));
        return new RegisterRoomResult(room.getPublicId());
    }

    @Transactional(readOnly = true)
    @Override
    public List<RoomInfo> search(SearchRoomQuery query) {
        List<Room> rooms = repository.findAllByCond(new RoomCond(query.name(), RoomStatus.READY));
        return rooms.stream().map(RoomInfo::from).toList();
    }
}
