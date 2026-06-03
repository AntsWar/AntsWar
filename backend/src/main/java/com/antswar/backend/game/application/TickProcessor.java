package com.antswar.backend.game.application;

import com.antswar.backend.game.application.port.out.GameRepository;
import com.antswar.backend.game.application.tick.TickHandler;
import com.antswar.backend.game.domain.Game;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class TickProcessor {
    private final GameRepository gameRepository;
    private final List<TickHandler> handlers;
    private final Clock clock;

    @PersistenceContext
    private EntityManager em;

    @Transactional
    public void tick(long gameId) {
        LocalDateTime now = LocalDateTime.now(clock);
        Game game = findOrCreate(gameId, now);

        for (TickHandler handler : handlers) {
            handler.handle(game, now);
        }
    }

    private Game findOrCreate(long gameId, LocalDateTime now) {
        return gameRepository.findById(gameId)
                .orElseGet(() -> {
                    LocalDateTime startedAt = now.truncatedTo(java.time.temporal.ChronoUnit.HOURS);
                    LocalDateTime endedAt = startedAt.plusHours(1);
                    Game game = new Game(gameId, startedAt, endedAt);
                    em.persist(game);
                    return game;
                });
    }

}
