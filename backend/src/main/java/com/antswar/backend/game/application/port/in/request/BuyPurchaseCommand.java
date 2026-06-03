package com.antswar.backend.game.application.port.in.request;

import com.antswar.backend.game.domain.player.PositionType;

public record BuyPurchaseCommand(long playerId, PositionType positionType, long purchaseId, int quantity){
}
