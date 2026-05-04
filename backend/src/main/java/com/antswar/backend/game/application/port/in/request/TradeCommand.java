package com.antswar.backend.game.application.port.in.request;

import com.antswar.backend.game.domain.player.OrderType;
import com.antswar.backend.game.domain.player.PositionType;

public record TradeCommand(long playerId, OrderType orderType, PositionType positionType, long purchaseId, int quantity){
}
