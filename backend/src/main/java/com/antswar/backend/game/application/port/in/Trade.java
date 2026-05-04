package com.antswar.backend.game.application.port.in;

import com.antswar.backend.game.application.port.in.request.TradeCommand;

public interface Trade {
    void trade(TradeCommand command);
}
