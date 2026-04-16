package com.antswar.backend.game.api.dto;

import jakarta.validation.constraints.Min;

public record PurchaseRequest(@Min(1) int purchaseId, @Min(1) int quantity) {
}
