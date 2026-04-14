package com.antswar.backend.room.application.port.out;

import com.antswar.backend.room.domain.Room;
import com.antswar.backend.room.domain.RoomStatus;
import com.antswar.backend.room.infrastructure.persistence.RoomRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long>, RoomRepositoryCustom {
    Optional<Room> findByPublicId(String publicId);
    List<Room> findAllByStatus(RoomStatus status);
}
