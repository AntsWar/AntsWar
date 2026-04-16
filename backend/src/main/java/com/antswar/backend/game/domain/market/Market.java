package com.antswar.backend.game.domain.market;

import com.antswar.backend.game.domain.Money;
import com.antswar.backend.game.exception.GameException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.antswar.backend.game.exception.GameErrorCode.MARKET_PURCHASE_NOT_FOUND;


public class Market {
    private final Map<Integer, Purchase> purchases = new HashMap<>();

    public Market() {
        for (PurchaseMeta meta : PurchaseMeta.values()) {
            purchases.put(meta.getId(), new Purchase(meta, Money.of(200)));
        }
    }

    public Purchase getPurchase(int purchaseId) {
        Purchase purchase = purchases.get(purchaseId);
        if (purchase == null) {
            throw new GameException(MARKET_PURCHASE_NOT_FOUND);
        }
        return purchase;
    }

    public List<Purchase> getPurchases(){
        return List.copyOf(purchases.values());
    }
}