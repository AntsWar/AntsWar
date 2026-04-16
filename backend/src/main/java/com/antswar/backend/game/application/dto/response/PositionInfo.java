package com.antswar.backend.game.application.dto.response;

import com.antswar.backend.game.domain.Money;
import com.antswar.backend.game.domain.market.PurchaseMeta;
import com.antswar.backend.game.domain.player.Position;
import com.antswar.backend.game.domain.player.PositionType;

public record PositionInfo(PurchaseMeta meta, PositionType type, int quantity, Money averagePrice) {
    public static PositionInfo from(Position position, PositionType type){
        return new PositionInfo(position.getPurchaseMeta(), type, position.getQuantity(), position.getAveragePrice());
    }
}
