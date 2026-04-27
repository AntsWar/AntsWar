package com.antswar.backend.game.application.port.in.game.request;

import com.antswar.backend.game.domain.market.PurchaseMeta;
import com.antswar.backend.game.domain.player.OrderType;
import com.antswar.backend.game.domain.player.PositionType;

public record OrderCommand(String gameId, String playerId, OrderType orderType, PositionType positionType, PurchaseMeta purchaseMeta, int quantity){
}
