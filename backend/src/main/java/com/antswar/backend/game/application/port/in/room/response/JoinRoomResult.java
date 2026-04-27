package com.antswar.backend.game.application.port.in.room.response;

import com.antswar.backend.game.application.dto.GameInfo;
import com.antswar.backend.game.application.dto.RoomInfo;

public record JoinRoomResult(RoomInfo room, GameInfo game, boolean isHost) {
}
