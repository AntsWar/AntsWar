package com.antswar.backend.game.application.port.out;

import com.antswar.backend.game.domain.player.Player;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlayerRepository extends JpaRepository<Player, String> {
    Optional<Player> findByRoomIdAndPlayerId(String roomId, String playerId);
}
