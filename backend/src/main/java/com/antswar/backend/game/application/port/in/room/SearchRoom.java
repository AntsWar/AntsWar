package com.antswar.backend.game.application.port.in.room;

import com.antswar.backend.game.application.dto.RoomInfo;

import java.util.List;

public interface SearchRoom {
    List<RoomInfo> search(String name);
}
