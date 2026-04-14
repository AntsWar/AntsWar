package com.antswar.backend.room.infrastructure.persistence;

import com.antswar.backend.room.application.dto.RoomCond;
import com.antswar.backend.room.domain.Room;

import java.util.List;

public interface RoomRepositoryCustom {
    List<Room> findAllByCond(RoomCond cond);
}
