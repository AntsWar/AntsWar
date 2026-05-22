package com.antswar.backend.game.application;

import com.antswar.backend.game.application.port.out.GameRepository;
import com.antswar.backend.game.application.tick.TickHandler;
import com.antswar.backend.game.domain.Game;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
@RequiredArgsConstructor
public class TickProcessor {
    private final GameRepository gameRepository;
    private final List<TickHandler> handlers;

    @Transactional
    public void tick(Instant now) {
        Game game = getOrStartCurrentGame(now);
        for (TickHandler handler : handlers) {
            handler.handle(game, now);
        }
    }

    private Game getOrStartCurrentGame(Instant now) {
        Instant startedAt = now.truncatedTo(ChronoUnit.HOURS);
        Instant endedAt = startedAt.plus(1, ChronoUnit.HOURS);

        return gameRepository.findCurrentGame(now)
                .orElseGet(() -> gameRepository.save(new Game(startedAt, endedAt)));
    }

}