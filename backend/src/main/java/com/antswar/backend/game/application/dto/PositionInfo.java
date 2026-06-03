package com.antswar.backend.game.application.dto;

import com.antswar.backend.game.domain.vo.Money;
import com.antswar.backend.game.domain.player.Position;
import com.antswar.backend.game.domain.player.PositionType;

public record PositionInfo(long id, PurchaseMetaInfo meta, PositionType type, int quantity, Money averagePrice) {
    public static PositionInfo from(Position position){
        return new PositionInfo(
                position.getId(),
                PurchaseMetaInfo.from(position.getPurchase().getMeta()),
                position.getType(),
                position.getQuantity(),
                position.getAveragePrice()
        );
    }
}
