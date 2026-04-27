package com.antswar.backend.game.application.dto;

import com.antswar.backend.game.domain.Money;
import com.antswar.backend.game.domain.market.Purchase;
import com.antswar.backend.game.domain.market.PurchaseMeta;
import com.antswar.backend.game.domain.market.PurchaseType;

public record PurchaseInfo(PurchaseMetaInfo meta, Money price) {
    public static PurchaseInfo from(Purchase purchase){
        return new PurchaseInfo(
                PurchaseMetaInfo.from(purchase.getMeta()),
                purchase.getPrice()
        );
    }
}
