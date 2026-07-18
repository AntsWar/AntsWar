package com.antswar.backend.game.application.port.in;

import com.antswar.backend.game.application.port.in.request.BuyPurchaseCommand;
import com.antswar.backend.game.application.port.in.request.SellPurchaseCommand;

public interface PurchaseTrade {
    void buy(long playerId, BuyPurchaseCommand command);
    void sell(long playerId, SellPurchaseCommand command);
}
