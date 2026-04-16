package com.antswar.backend.game.application.port.in.runningGame;

import com.antswar.backend.game.application.dto.request.runningGame.PurchaseCommand;

public interface SellPurchase {
    void sell(PurchaseCommand command);
}
