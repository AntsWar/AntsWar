package com.antswar.backend.game.domain.news;

import com.antswar.backend.game.domain.market.PurchaseMeta;

public record NewsEffect(PurchaseMeta meta, double impact) {
}
