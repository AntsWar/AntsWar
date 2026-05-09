package com.antswar.backend.game.application.port.in;

import com.antswar.backend.game.domain.player.Item;

public interface BuyItem {
    void buy(long playerId, Item item);
}
