package com.antswar.backend.game.application.port.out;

import com.antswar.backend.game.domain.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Instant;
import java.util.Optional;

public interface GameRepository extends JpaRepository<Game, Long> {
    @Query("select g from Game g where g.startedAt <= :now and g.endedAt > :now")
    Optional<Game> findCurrentGame(Instant now);
}
