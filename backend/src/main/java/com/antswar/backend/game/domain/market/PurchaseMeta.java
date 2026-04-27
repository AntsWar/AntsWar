package com.antswar.backend.game.domain.market;

import lombok.Getter;

@Getter
public enum PurchaseMeta {

    SAMSON("SAMSON", "삼손", PurchaseType.STOCK),
    SKY_HIGH("SKY_HIGH", "SKY하이", PurchaseType.STOCK),
    NVIDEO("NVIDEO", "앤비디오", PurchaseType.STOCK),
    ARMD("ARMD", "AMRD", PurchaseType.STOCK),
    OUTEL("OUTEL", "아웃텔", PurchaseType.STOCK),
    PSMC("PSMC", "PSMC", PurchaseType.STOCK),
    GOLDMAN_SOCKS("GOLDMAN_SOCKS", "골드무한삭스", PurchaseType.STOCK),

    BEET_COIN("BEET_COIN", "비즈코인", PurchaseType.CRYPTO),
    OTHEREUM("OTHEREUM", "이더러움", PurchaseType.CRYPTO),
    SOLONA("SOLONA", "솔로나", PurchaseType.CRYPTO),
    DOG_COIN("DOG_COIN", "도그코인", PurchaseType.CRYPTO),
    NIPPLE("NIPPLE", "니플", PurchaseType.CRYPTO);

    private final String code;
    private final String name;
    private final PurchaseType type;

    PurchaseMeta(String code, String name, PurchaseType type) {
        this.code = code;
        this.name = name;
        this.type = type;
    }
}
