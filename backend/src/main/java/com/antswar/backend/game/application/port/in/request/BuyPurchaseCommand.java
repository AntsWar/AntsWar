package com.antswar.backend.game.application.port.in.request;

import com.antswar.backend.game.domain.player.PositionType;

public record BuyPurchaseCommand(PositionType positionType, long purchaseId, int quantity){
}
