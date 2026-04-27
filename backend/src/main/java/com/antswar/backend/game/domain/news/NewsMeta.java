package com.antswar.backend.game.domain.news;

import com.antswar.backend.game.domain.market.PurchaseMeta;
import lombok.Getter;

import java.util.List;

@Getter
public enum NewsMeta {

    // 삼손전자 호실적 발표
    E1(
            "E1",
            List.of(
                    new NewsEffect(PurchaseMeta.S1, +0.2), // 직접 상승
                    new NewsEffect(PurchaseMeta.S2, -0.1), // 경쟁사 하락
                    new NewsEffect(PurchaseMeta.S3, +0.05) // 협력사 상승
            )
    ),

    // 반도체 규제 강화
    E2(
            "E2",
            List.of(
                    new NewsEffect(PurchaseMeta.S1, -0.15),
                    new NewsEffect(PurchaseMeta.S2, -0.2),
                    new NewsEffect(PurchaseMeta.S4, +0.1) // 대체 시장 상승
            )
    );

    private final String code;
    private final List<NewsEffect> effects;

    NewsMeta(String code, List<NewsEffect> effects) {
        this.code = code;
        this.effects = effects;
    }
}