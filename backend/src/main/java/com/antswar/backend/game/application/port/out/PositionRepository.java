package com.antswar.backend.game.application.port.out;

import com.antswar.backend.game.domain.player.Position;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PositionRepository extends JpaRepository<Position,Long> {
}
