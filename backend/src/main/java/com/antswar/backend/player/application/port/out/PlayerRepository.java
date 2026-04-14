package com.antswar.backend.player.application.port.out;

import com.antswar.backend.player.domain.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Long> {
}
