package com.antswar.backend.game.domain;

import com.antswar.backend.game.domain.market.PurchaseMeta;

public record PurchaseDelistedEvent(PurchaseMeta meta) implements GameDomainEvent {
}
