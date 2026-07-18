package com.antswar.backend.game.application.port.in.request;

public record SellPurchaseCommand(long positionId, int quantity){
}
