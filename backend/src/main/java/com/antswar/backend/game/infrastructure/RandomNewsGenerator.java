package com.antswar.backend.game.infrastructure;

import com.antswar.backend.game.application.port.out.NewsGenerator;
import com.antswar.backend.game.domain.news.NewsMeta;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Component
public class RandomNewsGenerator implements NewsGenerator {
    private static final double GENERATE_PROBABILITY = 0.15;

    public Optional<NewsMeta> generate() {
        if (ThreadLocalRandom.current().nextDouble() > GENERATE_PROBABILITY) {return Optional.empty();}
        NewsMeta[] values = NewsMeta.values();
        return Optional.of(values[ThreadLocalRandom.current().nextInt(values.length)]);
    }
}
