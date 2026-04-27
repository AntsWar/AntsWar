package com.antswar.backend.game.application.dto;

import com.antswar.backend.game.domain.market.PurchaseMeta;
import com.antswar.backend.game.domain.market.PurchaseType;

public record PurchaseMetaInfo(String code, String name, PurchaseType type){
    public static PurchaseMetaInfo from(PurchaseMeta meta){
        return new PurchaseMetaInfo(meta.getCode(), meta.getName(), meta.getType());
    }
}