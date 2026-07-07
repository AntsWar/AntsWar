package com.antswar.backend.game.application.tick;

import com.antswar.backend.game.application.dto.PurchaseMetaInfo;
import com.antswar.backend.game.application.dto.GameEvent;
import com.antswar.backend.game.application.port.out.PriceHistoryRepository;
import com.antswar.backend.game.application.port.out.PurchaseRepository;
import com.antswar.backend.game.domain.Game;
import com.antswar.backend.game.application.PriceBoard;
import com.antswar.backend.game.domain.purchase.PriceHistory;
import com.antswar.backend.game.domain.purchase.Purchase;
import com.antswar.backend.game.domain.purchase.PurchaseMeta;
import com.antswar.backend.game.domain.purchase.PurchaseType;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Order(1)
@RequiredArgsConstructor
@Component
public class PurchaseTickHandler implements TickHandler {
    private final PurchaseRepository purchaseRepository;
    private final PriceHistoryRepository priceHistoryRepository;
    private final PriceBoard priceBoard;
    private final Random random;
    private final ApplicationEventPublisher eventPublisher;

    private static final double STEP = 0.05;

    @Override
    public void handle(Game game, LocalDateTime now) {
        List<Purchase> purchases = game.getPurchases();

        purchases.forEach(purchase -> {
            if (purchase.isDelisted()) {
                purchase.decreaseRespawnTick();
                return;
            }
            PurchaseMeta meta = purchase.getMeta();
            int impact = priceBoard.impactOf(meta);
            double rate = nextRate(meta, impact);
            purchase.updatePrice(rate);

            if (purchase.shouldDelist()) {
                purchase.delist();

                eventPublisher.publishEvent(new GameEvent(
                        "PURCHASE_DELIST",
                        PurchaseMetaInfo.from(purchase.getMeta()))
                );
            }
        });

        List<PriceHistory> histories = purchases.stream()
                .map(p -> new PriceHistory(p, p.getPrice(), now))
                .toList();
        priceHistoryRepository.saveAll(histories);
    }

    double nextRate(PurchaseMeta meta, int impact) {
        RateRange range = baseRangeOf(meta.getType());
        int minStep = range.min() + impact;
        int maxStep = range.max() + impact;

        int randomStep = random.nextInt(maxStep - minStep + 1) + minStep;

        return randomStep * STEP;
    }

    static RateRange baseRangeOf(PurchaseType type) {
        return type == PurchaseType.STOCK
                ? new RateRange(-1, 1)
                : new RateRange(-4, 4);
    }

    record RateRange(int min, int max) { }
}
