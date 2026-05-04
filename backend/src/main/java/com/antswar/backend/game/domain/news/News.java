package com.antswar.backend.game.domain.news;

import lombok.Getter;

public class News {
    @Getter
    private final NewsMeta meta;
    private int remainingTick;

    private static final int DEFAULT_REMAINING_TICKS = 4;

    public News(NewsMeta meta){
        this.meta = meta;
        this.remainingTick = DEFAULT_REMAINING_TICKS;
    }

    public boolean tickAndExpired() {
        this.remainingTick--;
        return remainingTick <= 0;
    }
}
