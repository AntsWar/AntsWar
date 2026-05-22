package com.antswar.backend.game.application.port.in;


import com.antswar.backend.game.domain.item.Item;

public interface BuyItem {
    void buy(long playerId, Item item, String code);
}
