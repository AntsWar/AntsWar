package com.antswar.backend.game.application.port.in.request;

public record SellPurchaseCommand(long playerId, long positionId, int quantity){
}
