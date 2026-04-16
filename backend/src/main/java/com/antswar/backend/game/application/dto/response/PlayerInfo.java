package com.antswar.backend.game.application.dto.response;

import com.antswar.backend.game.domain.Money;
import com.antswar.backend.game.domain.player.Player;

public record PlayerInfo(String id, String name, Money balance) {
    public static PlayerInfo from(Player player){
        return new PlayerInfo(player.getId(), player.getName(), player.getMoney());
    }
}
