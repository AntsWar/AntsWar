package com.antswar.backend.game.application.port.in.room;

import com.antswar.backend.game.application.port.in.room.request.JoinRoomCommand;
import com.antswar.backend.game.application.port.in.room.response.JoinRoomResult;

public interface JoinRoom {
    JoinRoomResult join(JoinRoomCommand command);
}
