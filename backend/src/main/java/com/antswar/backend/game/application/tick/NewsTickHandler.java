package com.antswar.backend.game.application.tick;

import com.antswar.backend.game.application.PriceBoard;
import com.antswar.backend.game.domain.Game;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Component
public class NewsTickHandler implements TickHandler {
    private final PriceBoard priceBoard;

    @Override
    public void handle(Game game, LocalDateTime now) {
        priceBoard.tick();
    }
}
