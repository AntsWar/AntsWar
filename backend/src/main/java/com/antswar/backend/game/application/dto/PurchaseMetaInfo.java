package com.antswar.backend.game.application.dto;

import com.antswar.backend.game.domain.purchase.PurchaseMeta;
import com.antswar.backend.game.domain.purchase.PurchaseType;

import java.util.List;

public record PurchaseMetaInfo(String code, String name, PurchaseType type, String description, List<String> keywords){
    public static PurchaseMetaInfo from(PurchaseMeta meta){
        return new PurchaseMetaInfo(meta.getCode(), meta.getName(), meta.getType(), meta.getDescription(), meta.getKeywords());
    }
}