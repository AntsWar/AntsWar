package com.antswar.backend.game.application.dto.request.runningGame;

import com.antswar.backend.game.domain.player.PositionType;

public record PurchaseCommand(String gameId, String playerId, PositionType type, int purchaseId, int quantity){
}
