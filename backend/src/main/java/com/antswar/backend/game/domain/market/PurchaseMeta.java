package com.antswar.backend.game.domain.market;

import lombok.Getter;

@Getter
public enum PurchaseMeta {
    // STOCK
    S1(1, "삼손전자", PurchaseType.STOCK),
    S2(2, "SKY하이", PurchaseType.STOCK),
    S3(3, "애비디아", PurchaseType.STOCK),
    S4(4, "AMZ", PurchaseType.STOCK),
    S5(5, "신현은행", PurchaseType.STOCK),

    // CRYPTO
    C1(6, "비즈코인", PurchaseType.CRYPTO),
    C2(7, "이더러움", PurchaseType.CRYPTO),
    C3(8, "솔로나", PurchaseType.CRYPTO),
    C4(9, "돼지코인", PurchaseType.CRYPTO),
    C5(10, "니플", PurchaseType.CRYPTO),
    ;

    private final int id;
    private final String name;
    private final PurchaseType type;

    PurchaseMeta(int id, String name, PurchaseType type) {
        this.id = id;
        this.name = name;
        this.type = type;
    }

}
