package com.antswar.backend.game.application.port.in.game;

import com.antswar.backend.game.application.port.in.game.request.OrderCommand;

public interface Trade {
    void order(OrderCommand command);
}
