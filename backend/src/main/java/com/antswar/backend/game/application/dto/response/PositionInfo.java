package com.antswar.backend.game.application.dto.response;

import com.antswar.backend.game.domain.Money;
import com.antswar.backend.game.domain.market.PurchaseMeta;
import com.antswar.backend.game.domain.player.Position;

public record PositionInfo(PurchaseMeta meta, int quantity, Money averagePrice) {
    public static PositionInfo from(Position position){
        return new PositionInfo(position.getPurchaseMeta(), position.getQuantity(), position.getAveragePrice());
    }
}
