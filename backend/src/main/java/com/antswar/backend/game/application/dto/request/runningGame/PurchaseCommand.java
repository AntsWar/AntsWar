package com.antswar.backend.game.application.dto.request.runningGame;

public record PurchaseCommand(String gameId, String playerId, int purchaseId, int quantity){
}
