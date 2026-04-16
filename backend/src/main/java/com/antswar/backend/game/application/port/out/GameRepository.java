package com.antswar.backend.game.application.port.out;

import com.antswar.backend.game.application.dto.RoomCond;
import com.antswar.backend.game.domain.game.Game;

import java.util.List;
import java.util.Optional;

public interface GameRepository {
    Game save(Game game);
    Optional<Game> findById(String id);
    void delete(String id);
    List<Game> findAllByCond(RoomCond cond);
}
