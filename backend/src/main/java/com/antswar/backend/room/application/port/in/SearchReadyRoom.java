package com.antswar.backend.room.application.port.in;

import com.antswar.backend.room.application.dto.RoomInfo;
import com.antswar.backend.room.application.dto.SearchRoomQuery;

import java.util.List;

public interface SearchReadyRoom {
    List<RoomInfo> search(SearchRoomQuery query);
}
