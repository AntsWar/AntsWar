package com.antswar.backend.game.application.dto;

import com.antswar.backend.game.domain.vo.Money;
import com.antswar.backend.game.domain.purchase.Purchase;

import java.util.List;

public record PurchaseInfo(long id, PurchaseMetaInfo meta, Money price) {
    public static PurchaseInfo from(Purchase purchase){
        return new PurchaseInfo(
                purchase.getId(),
                PurchaseMetaInfo.from(purchase.getMeta()),
                purchase.getPrice()
        );
    }

    public static List<PurchaseInfo> from(List<Purchase> purchases){
        return purchases.stream()
                .filter(purchase -> !purchase.isDelisted())
                .map(PurchaseInfo::from)
                .toList();
    }
}
