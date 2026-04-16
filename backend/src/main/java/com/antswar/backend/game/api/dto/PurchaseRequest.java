package com.antswar.backend.game.api.dto;

import com.antswar.backend.game.domain.player.PositionType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record PurchaseRequest(@Min(1) int purchaseId, @NotNull PositionType type, @Min(1) int quantity) {
}
