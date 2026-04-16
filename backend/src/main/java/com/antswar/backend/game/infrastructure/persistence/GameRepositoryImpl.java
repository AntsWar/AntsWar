package com.antswar.backend.game.infrastructure.persistence;

import com.antswar.backend.game.application.dto.RoomCond;
import com.antswar.backend.game.application.port.out.GameRepository;
import com.antswar.backend.game.domain.game.Game;
import com.antswar.backend.game.domain.game.GameStatus;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import static org.springframework.util.StringUtils.hasText;

@Repository
public class GameRepositoryImpl implements GameRepository {
    private final Map<String, Game> games = new ConcurrentHashMap<>();

    @Override
    public Game save(Game game) {
        games.put(game.getId(), game);
        return game;
    }

    @Override
    public List<Game> findAllByCond(RoomCond cond) {
        return games.values().stream()
                .filter(room -> roomStatusEq(cond.status(), room))
                .filter(room -> roomNameLike(cond.name(), room))
                .toList();
    }

    @Override
    public Optional<Game> findById(String id) {
        return Optional.ofNullable(games.get(id));
    }

    @Override
    public void delete(String id) {
        games.remove(id);
    }

    private boolean roomNameLike(String name, Game game) {
        return !hasText(name) || game.getName().contains(name);
    }

    private boolean roomStatusEq(GameStatus status, Game game) {
        return status == null || game.getStatus() == status;
    }
}
