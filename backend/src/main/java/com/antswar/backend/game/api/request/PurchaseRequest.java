package com.antswar.backend.game.api.request;

import com.antswar.backend.game.domain.market.PurchaseMeta;
import com.antswar.backend.game.domain.player.OrderType;
import com.antswar.backend.game.domain.player.PositionType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record PurchaseRequest(
        @NotNull OrderType orderType,
        @NotNull PurchaseMeta meta,
        @NotNull PositionType positionType,
        @Min(1) int quantity) {
}
