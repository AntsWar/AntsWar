package com.antswar.backend.room.application;

import com.antswar.backend.room.application.dto.RegisterRoomCommand;
import com.antswar.backend.room.application.dto.RegisterRoomResult;
import com.antswar.backend.room.application.port.in.RegisterRoom;
import com.antswar.backend.room.domain.Room;
import com.antswar.backend.room.application.port.out.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class RoomApplicationService implements RegisterRoom {
    private final RoomRepository repository;

    @Transactional
    @Override
    public RegisterRoomResult register(RegisterRoomCommand command) {
        Room room = repository.save(Room.of(command.name(), command.password(), command.hostId(), command.mode()));
        return new RegisterRoomResult(room.getPublicId());
    }
}
