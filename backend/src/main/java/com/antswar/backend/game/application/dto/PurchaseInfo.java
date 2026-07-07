package com.antswar.backend.game.application.dto;

import com.antswar.backend.game.domain.purchase.PriceHistory;
import com.antswar.backend.game.domain.purchase.Purchase;
import com.antswar.backend.game.domain.vo.Money;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public record PurchaseInfo(long id, PurchaseMetaInfo meta, Money price, List<PricePoint> priceHistory) {

    public record PricePoint(BigDecimal price, long gameTime) { }

    public static PurchaseInfo from(Purchase purchase) {
        return new PurchaseInfo(
                purchase.getId(),
                PurchaseMetaInfo.from(purchase.getMeta()),
                purchase.getPrice(),
                List.of()
        );
    }

    public static PurchaseInfo from(Purchase purchase, List<PriceHistory> history, LocalDateTime startedAt) {
        List<PricePoint> points = history.stream()
                .map(h -> new PricePoint(
                        h.getPrice().getAmount(),
                        ChronoUnit.SECONDS.between(startedAt, h.getRecordedAt())
                ))
                .toList();
        return new PurchaseInfo(
                purchase.getId(),
                PurchaseMetaInfo.from(purchase.getMeta()),
                purchase.getPrice(),
                points
        );
    }

    public static List<PurchaseInfo> from(List<Purchase> purchases) {
        return purchases.stream()
                .map(PurchaseInfo::from)
                .toList();
    }

    public static List<PurchaseInfo> from(List<Purchase> purchases, List<PriceHistory> allHistories, LocalDateTime startedAt) {
        Map<Long, List<PriceHistory>> historyByPurchaseId = allHistories.stream()
                .collect(Collectors.groupingBy(h -> h.getPurchase().getId()));
        return purchases.stream()
                .map(p -> PurchaseInfo.from(p, historyByPurchaseId.getOrDefault(p.getId(), List.of()), startedAt))
                .toList();
    }
}
