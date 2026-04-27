package com.antswar.backend.game.domain.market;

import lombok.Getter;

@Getter
public enum PurchaseMeta {

    S1("S1", "삼손전자", PurchaseType.STOCK),
    S2("S2", "SKY하이", PurchaseType.STOCK),
    S3("S3", "애비디아", PurchaseType.STOCK),
    S4("S4", "AMZ", PurchaseType.STOCK),
    S5("S5", "신현은행", PurchaseType.STOCK),

    C1("C1", "비즈코인", PurchaseType.CRYPTO),
    C2("C2", "이더러움", PurchaseType.CRYPTO),
    C3("C3", "솔로나", PurchaseType.CRYPTO),
    C4("C4", "돼지코인", PurchaseType.CRYPTO),
    C5("C5", "니플", PurchaseType.CRYPTO);

    private final String code;
    private final String name;
    private final PurchaseType type;

    PurchaseMeta(String code, String name, PurchaseType type) {
        this.code = code;
        this.name = name;
        this.type = type;
    }
}
