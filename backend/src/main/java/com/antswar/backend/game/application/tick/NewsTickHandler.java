package com.antswar.backend.game.application.tick;

import com.antswar.backend.game.application.dto.GameEvent;
import com.antswar.backend.game.application.port.out.PlayerPublisher;
import com.antswar.backend.game.domain.Game;
import com.antswar.backend.game.domain.news.News;
import com.antswar.backend.game.domain.news.NewsBoard;
import com.antswar.backend.game.domain.news.NewsMeta;
import com.antswar.backend.game.domain.news.NoticeManager;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@RequiredArgsConstructor
@Component
public class NewsTickHandler implements TickHandler {
    private final NewsBoard newsBoard;
    private final Random random;
    private final ApplicationEventPublisher eventPublisher;

    private static final double GENERATE_PROBABILITY = 0.15;

    @Override
    public void handle(Game game, LocalDateTime now) {
        newsBoard.tick();

        generate().ifPresent(meta -> {
            newsBoard.add(new News(meta));
            eventPublisher.publishEvent(new GameEvent("NOTICE", meta));
        });
    }

    private Optional<NewsMeta> generate() {
        if (random.nextDouble() > GENERATE_PROBABILITY) return Optional.empty();
        NewsMeta[] values = NewsMeta.values();
        return Optional.of(values[random.nextInt(values.length)]);
    }
}
