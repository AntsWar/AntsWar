package com.antswar.backend.game.application.port.in.room;

import com.antswar.backend.game.application.port.in.room.request.RegisterRoomCommand;
import com.antswar.backend.game.application.port.in.room.response.RegisterRoomResult;

public interface RegisterRoom {
    RegisterRoomResult register(RegisterRoomCommand command);
}
