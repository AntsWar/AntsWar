package com.antswar.backend.game.application.port.out;

import com.antswar.backend.game.domain.room.Room;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, String> {
    @Query("select r from Room r where r.game is null")
    List<Room> findAllWaiting();
    @Query("select r from Room r where r.game is null and r.name like %:name%")
    List<Room> findAllWaitingByName(@Param("name") String name);

    @Query("select r.id from Room r left join r.game g where g is null or g.endedAt is null")
    List<String> findAllNotFinishedIds();

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select r from Room r where r.id = :id")
    Optional<Room> findByIdWithLock(@Param("id") String id);
}
