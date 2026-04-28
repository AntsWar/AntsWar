package com.antswar.backend.game.application.port.out;

import com.antswar.backend.game.domain.news.NewsMeta;

import java.util.Optional;

public interface NewsGenerator {
    Optional<NewsMeta> generate();
}
