package com.antswar.backend.game.domain.player;

import com.antswar.backend.game.domain.vo.Money;
import lombok.Getter;

public enum Item {
    NEWS_RADAR(Money.of(15_0)),
    FAKE_NEWS(Money.of(20_0)),
    ;

    @Getter
    private final Money price;

    Item(Money price) {
        this.price = price;
    }
}