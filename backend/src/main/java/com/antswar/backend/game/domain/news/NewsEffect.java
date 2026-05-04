package com.antswar.backend.game.domain.news;

import com.antswar.backend.game.domain.purchase.PurchaseMeta;

public record NewsEffect(PurchaseMeta meta, int impact) {
}
