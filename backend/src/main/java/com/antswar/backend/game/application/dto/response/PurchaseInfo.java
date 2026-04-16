package com.antswar.backend.game.application.dto.response;

import com.antswar.backend.game.domain.Money;
import com.antswar.backend.game.domain.market.Purchase;
import com.antswar.backend.game.domain.market.PurchaseMeta;

public record PurchaseInfo(PurchaseMeta meta, Money price) {
    public static PurchaseInfo from(Purchase purchase){
        return new PurchaseInfo(purchase.getMeta(), purchase.getPrice());
    }
}
