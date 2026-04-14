package com.antswar.backend.room.application.port.out;

import com.antswar.backend.room.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
