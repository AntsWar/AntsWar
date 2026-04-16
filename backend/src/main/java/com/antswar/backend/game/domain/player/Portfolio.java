package com.antswar.backend.game.domain.player;

import com.antswar.backend.game.domain.market.Purchase;
import com.antswar.backend.game.domain.market.PurchaseMeta;
import com.antswar.backend.game.exception.GameException;

import java.util.HashMap;
import java.util.Map;

import static com.antswar.backend.game.exception.GameErrorCode.PLAYER_NOT_OWNED;

public class Portfolio {
    private final Map<PurchaseMeta, Position> longPositions = new HashMap<>();
    private final Map<PurchaseMeta, Position> shortPositions = new HashMap<>();

    protected void add(Purchase purchase, PositionType type, int quantity) {
        var positions = getPositions(type);

        Position position = positions.computeIfAbsent(purchase.getMeta(), Position::new);
        position.add(quantity, purchase.getPrice());
    }

    protected void subtract(Purchase purchase,  PositionType type, int quantity){
        var positions = getPositions(type);

        Position position = positions.get(purchase.getMeta());
        if (position == null) throw new GameException(PLAYER_NOT_OWNED);

        position.subtract(quantity);
        if (position.isEmpty()) {
            positions.remove(purchase.getMeta());
        }
    }

    protected Map<PurchaseMeta, Position> getPositions(PositionType type) {
        return type == PositionType.LONG ? longPositions : shortPositions;
    }
}
