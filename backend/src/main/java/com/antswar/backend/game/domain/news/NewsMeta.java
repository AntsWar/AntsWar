package com.antswar.backend.game.domain.news;

import lombok.Getter;

import java.util.List;

import static com.antswar.backend.game.domain.market.PurchaseMeta.*;

@Getter
public enum NewsMeta {
    /* 상승 요인 */
    SAMSON_GOOD_PERFORMANCE(
            "SAMSON_GOOD_PERFORMANCE",
            List.of(
                    new NewsEffect(SAMSON, +4) // 직접 상승
            )
    ),
    SKY_HIGH_GOOD_PERFORMANCE(
            "SKY_HIGH_GOOD_PERFORMANCE",
            List.of(
                    new NewsEffect(SKY_HIGH, +4) // 직접 상승
            )
    ),
    NVIDEO_GOOD_PERFORMANCE(
            "NVIDEO_GOOD_PERFORMANCE",
            List.of(
                    new NewsEffect(NVIDEO, +4)  // 직접 상승
            )
    ),
    ARMD_GOOD_PERFORMANCE(
            "ARMD_GOOD_PERFORMANCE",
            List.of(
                    new NewsEffect(ARMD, +4)    // 직접 상승
            )
    ),
    OUTEL_GOOD_PERFORMANCE(
            "OUTEL_GOOD_PERFORMANCE",
            List.of(
                    new NewsEffect(OUTEL, +4)   // 직접 상승
            )
    ),
    PSMC_GOOD_PERFORMANCE(
            "PSMC_GOOD_PERFORMANCE",
            List.of(
                    new NewsEffect(PSMC, +4)    // 직접 상승
            )
    ),
    GOLDMAN_SOCKS_GOOD_PERFORMANCE(
            "GOLDMAN_SOCKS_GOOD_PERFORMANCE",
            List.of(
                    new NewsEffect(GOLDMAN_SOCKS, +4)    // 직접 상승
            )
    ),
    AI_MARKETS_GROWTH(
            "AI_MARKETS_GROWTH",
            List.of(
                    new NewsEffect(NVIDEO, +3), // GPU 수요 증가
                    new NewsEffect(ARMD, +2),   // GPU 수요 증가
                    new NewsEffect(SKY_HIGH, +2), //  HBM 수요 증가
                    new NewsEffect(SAMSON, +1)  // 메모리 수요 증가
            )
    ),
    INSUFFICIENT_MEMORY_SUPPLY(
            "INSUFFICIENT_MEMORY_SUPPLY",
            List.of(
                    new NewsEffect(SAMSON, +3),   // 수요 증가
                    new NewsEffect(SKY_HIGH, +3)  // 수요 증가
            )
    ),
    INSUFFICIENT_CPU_SUPPLY(
            "INSUFFICIENT_CPU_SUPPLY",
            List.of(
                    new NewsEffect(OUTEL, +3),   // 수요 증가
                    new NewsEffect(ARMD, +1)  // 수요 증가
            )
    ),
    INCREASING_FOUNDRY_DEMAND(
            "INCREASING_FOUNDRY_DEMAND",
            List.of(
                    new NewsEffect(PSMC, +3), // 수요 증가
                    new NewsEffect(SAMSON, +1)    // 수요 증가
            )
    ),
    INCREASE_INTEREST_RATE(
            "INCREASE_INTEREST_RATE",
            List.of(
                    new NewsEffect(GOLDMAN_SOCKS, +2),    // 금리 인상으로 인한 기대치 상승
                    new NewsEffect(BEET_COIN, -1),    // 은행으로 돈 몰림
                    new NewsEffect(OTHEREUM, -1) // 은행으로 돈 몰림
            )
    ),
    PSMC_1_NANO_ADVANCEMENT(
            "PSMC_1_NANO_ADVANCEMENT",
            List.of(
                    new NewsEffect(PSMC,+4),  // 직접 상승
                    new NewsEffect(SAMSON, -1)   // 경쟁사 하락
            )
    ),
    SAMSON_2_NANO_STABILIZATION(
            "SAMSON_2_NANO_STABILIZATION",
            List.of(
                    new NewsEffect(SAMSON,+4),  // 직접 상승
                    new NewsEffect(PSMC, -1)   // 경쟁사 하락
            )
    ),
    AGENTIC_AI_AGE( // CPU가 중요한 AI
            "AGENTIC_AI_AGE",
            List.of(
                    new NewsEffect(PSMC, +4), // PSMC 독점 계약
                    new NewsEffect(OUTEL,+2),  // 기대치 상승
                    new NewsEffect(NVIDEO, -1)   // GPU 기대치 하락
            )
    ),
    BANK_MADE_COIN(
            "BANK_MADE_COIN",
            List.of(
                    new NewsEffect(GOLDMAN_SOCKS, +1)    // 기대치 상승
            )
    ),
    INCREASED_DEMAND_FOR_ARM_BASED_CPU(
            "INCREASED_DEMAND_FOR_ARM_BASED_CPU",
            List.of(
                    new NewsEffect(PSMC, +2), // ARM은 PSMC
                    new NewsEffect(OUTEL, -1),    // AMD
                    new NewsEffect(ARMD, -1) // AMD
            )
    ),
    COINS_ARE_FUTURE(
            "COINS_ARE_FUTURE",
            List.of(
                    new NewsEffect(BEET_COIN, 6),
                    new NewsEffect(OTHEREUM, 6),
                    new NewsEffect(SOLONA, 4),
                    new NewsEffect(DOG_COIN, 4),
                    new NewsEffect(NIPPLE, 4)
            )
    ),

    /* 하락 요인 */
    SAMSON_BAD_PERFORMANCE(
            "SAMSON_BAD_PERFORMANCE",
            List.of(
                    new NewsEffect(SAMSON, -4) // 직접 하락
            )
    ),
    SKY_HIGH_BAD_PERFORMANCE(
            "SKY_HIGH_BAD_PERFORMANCE",
            List.of(
                    new NewsEffect(SKY_HIGH, -4) // 직접 하락
            )
    ),
    NVIDEO_BAD_PERFORMANCE(
            "NVIDEO_BAD_PERFORMANCE",
            List.of(
                    new NewsEffect(NVIDEO, -4)  // 직접 하락
            )
    ),
    ARMD_BAD_PERFORMANCE(
            "ARMD_BAD_PERFORMANCE",
            List.of(
                    new NewsEffect(ARMD, -4)    // 직접 하락
            )
    ),
    OUTEL_BAD_PERFORMANCE(
            "OUTEL_BAD_PERFORMANCE",
            List.of(
                    new NewsEffect(OUTEL, -4)   // 직접 하락
            )
    ),
    PSMC_BAD_PERFORMANCE(
            "PSMC_BAD_PERFORMANCE",
            List.of(
                    new NewsEffect(PSMC, -4)    // 직접 하락
            )
    ),
    GOLDMAN_SOCKS_BAD_PERFORMANCE(
            "GOLDMAN_SOCKS_BAD_PERFORMANCE",
            List.of(
                    new NewsEffect(GOLDMAN_SOCKS, -4)    // 직접 하락
            )
    ),
    AI_SLOW_DEMAND(
            "AI_SLOW_DEMAND",
            List.of(
                    new NewsEffect(NVIDEO, -3), // GPU 수요 하락
                    new NewsEffect(ARMD, -2),   // GPU 수요 하락
                    new NewsEffect(SKY_HIGH, -2), //  HBM 수요 하락
                    new NewsEffect(SAMSON, -1)  // 메모리 수요 하락
            )
    ),
    GPU_COMPETITION_INTENSIFIES(
            "GPU_COMPETITION_INTENSIFIES",
            List.of(
                    new NewsEffect(NVIDEO, -3),  // 경쟁으로 인한 하락
                    new NewsEffect(ARMD, -2), // 경쟁으로 인한 하락
                    new NewsEffect(PSMC, +1) //  고객사 간 경쟁으로 인한 상승
            )
    ),
    MEMORY_COMPETITION_INTENSIFIES(
            "MEMORY_COMPETITION_INTENSIFIES",
            List.of(
                    new NewsEffect(SAMSON, -2),  // 경쟁으로 인한 하락
                    new NewsEffect(SKY_HIGH, -2) // 경쟁으로 인한 하락
            )
    ),
    CPU_COMPETITION_INTENSIFIES(
            "CPU_COMPETITION_INTENSIFIES",
            List.of(
                    new NewsEffect(OUTEL, -2),   // 경쟁으로 인한 하락
                    new NewsEffect(ARMD, -2)  // 경쟁으로 인한 하락
            )
    ),
    DECREASE_INTEREST_RATE(
            "DECREASE_INTEREST_RATE",
            List.of(
                    new NewsEffect(GOLDMAN_SOCKS, -1),    // 금리 하락으로 인한 기대치 하락
                    new NewsEffect(BEET_COIN, +2),    //  대체재로 인한 상승
                    new NewsEffect(OTHEREUM, +2),     //  대체재로 인한 상승
                    new NewsEffect(SOLONA, +2)   //  대체재로 인한 상승
            )
    ),
    SEMICONDUCTOR_SUPPLY_CHAIN_DISRUPTIONS(
            "SEMICONDUCTOR_SUPPLY_CHAIN_DISRUPTIONS",
            List.of(
                    new NewsEffect(PSMC, -1),    // 직접 하락
                    new NewsEffect(SAMSON, -1)   // 직접 하락
            )
    ),
    COINS_ARE_NOT_FUTURE(
            "COINS_ARE_NOT_FUTURE",
            List.of(
                    new NewsEffect(BEET_COIN, -6),
                    new NewsEffect(OTHEREUM, -6),
                    new NewsEffect(SOLONA, -4),
                    new NewsEffect(DOG_COIN, -4),
                    new NewsEffect(NIPPLE, -4)
            )
    )
    ;

    private final String code;
    private final List<NewsEffect> effects;

    NewsMeta(String code, List<NewsEffect> effects) {
        this.code = code;
        this.effects = effects;
    }
}