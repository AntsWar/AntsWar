package com.antswar.backend.game.domain.player;

import com.antswar.backend.game.domain.Money;
import com.antswar.backend.game.domain.market.Purchase;
import com.antswar.backend.game.domain.market.PurchaseMeta;
import com.antswar.backend.game.exception.GameException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.antswar.backend.game.exception.GameErrorCode.PLAYER_NOT_OWNED;

public class Portfolio {
    private final Map<PurchaseMeta, Position> positions = new HashMap<>();

    protected List<Position> getPositions(){
        return List.copyOf(positions.values());
    }

    protected void add(Purchase purchase, int quantity) {
        Position position = positions.computeIfAbsent(purchase.getMeta(), Position::new);
        position.add(quantity, purchase.getPrice());
    }

    protected void subtract(Purchase purchase, int quantity){
        Position position = positions.get(purchase.getMeta());
        if (position == null) throw new GameException(PLAYER_NOT_OWNED);

        position.subtract(quantity);
        if (position.isEmpty()) {
            positions.remove(purchase.getMeta());
        }
    }
}
