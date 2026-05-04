package com.antswar.backend.game.domain.event;

import com.antswar.backend.game.domain.purchase.PurchaseMeta;

public record PurchaseDelistedEvent(PurchaseMeta meta) implements GameDomainEvent {
}
