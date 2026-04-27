package com.antswar.backend.game.domain.news;

import java.util.Optional;

public interface NewsGenerator {
    Optional<NewsMeta> generate();
}
