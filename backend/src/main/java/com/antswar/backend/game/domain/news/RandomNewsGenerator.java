package com.antswar.backend.game.domain.news;

import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Component
public class RandomNewsGenerator implements NewsGenerator {
    private static final double GENERATE_PROBABILITY = 0.3;

    public Optional<NewsMeta> generate() {
        if (ThreadLocalRandom.current().nextDouble() > GENERATE_PROBABILITY) {return Optional.empty();}
        NewsMeta[] values = NewsMeta.values();
        System.out.println("new 발생");
        return Optional.of(values[ThreadLocalRandom.current().nextInt(values.length)]);
    }
}
