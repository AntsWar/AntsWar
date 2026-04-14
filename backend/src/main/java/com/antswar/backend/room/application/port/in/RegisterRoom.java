package com.antswar.backend.room.application.port.in;

import com.antswar.backend.room.application.dto.RegisterRoomCommand;
import com.antswar.backend.room.application.dto.RegisterRoomResult;

public interface RegisterRoom {
    RegisterRoomResult register(RegisterRoomCommand command);
}
