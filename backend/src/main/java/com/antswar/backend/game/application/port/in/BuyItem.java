package com.antswar.backend.game.application.port.in;


import com.antswar.backend.game.application.port.in.response.BuyRumorResult;
import com.antswar.backend.game.domain.item.Item;

public interface BuyItem {
    void buyItem(long playerId, Item item);
    BuyRumorResult buyRumor(long playerId, Item item, String category);
}
