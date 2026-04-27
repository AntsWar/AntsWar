package com.antswar.backend.game.application.dto;

import com.antswar.backend.game.domain.Money;
import com.antswar.backend.game.domain.market.PurchaseMeta;
import com.antswar.backend.game.domain.player.Position;
import com.antswar.backend.game.domain.player.PositionType;

public record PositionInfo(PurchaseMetaInfo meta, PositionType type, int quantity, Money averagePrice) {
    public static PositionInfo from(Position position){
        return new PositionInfo(PurchaseMetaInfo.from(
                position.getPurchaseMeta()),
                position.getType(),
                position.getQuantity(),
                position.getAveragePrice());
    }
}
