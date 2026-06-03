package com.antswar.backend.game.api.request;

import com.antswar.backend.game.domain.player.PositionType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record BuyPurchaseRequest(
        @NotNull long purchaseId,
        @NotNull PositionType positionType,
        @Min(1) int quantity) {
}
