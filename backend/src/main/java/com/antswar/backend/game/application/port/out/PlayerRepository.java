package com.antswar.backend.game.application.port.out;

import com.antswar.backend.game.domain.game.Game;
import com.antswar.backend.game.domain.player.Player;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlayerRepository extends JpaRepository<Player, Long> {
    List<Player> findAllByGameAndDeActiveIsFalse(Game game);
}
