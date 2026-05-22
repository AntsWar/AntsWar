package com.antswar.backend.game.domain.item;

import com.antswar.backend.game.domain.vo.Money;
import lombok.Getter;

public enum Item {
    NEWS_RADAR(Money.of(3_000)),
    FAKE_NEWS(Money.of(3_000)),
    GOLDEN_FINGER(Money.of(0)),
    LUCKY_BOX(Money.of(1000)),
    ;

    @Getter
    private final Money price;

    Item(Money price) {
        this.price = price;
    }
}