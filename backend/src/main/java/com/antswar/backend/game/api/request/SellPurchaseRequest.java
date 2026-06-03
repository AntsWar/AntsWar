package com.antswar.backend.game.api.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record SellPurchaseRequest(
        @NotNull long positionId,
        @Min(1) int quantity) {
}
