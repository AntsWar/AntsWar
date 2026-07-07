package com.antswar.backend.game.api.request;

import com.antswar.backend.game.domain.item.Item;
import jakarta.validation.constraints.NotNull;

public record BuyItemRequest(@NotNull Item item, String category) { }
