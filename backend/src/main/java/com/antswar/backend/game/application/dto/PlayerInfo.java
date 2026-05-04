package com.antswar.backend.game.application.dto;

import com.antswar.backend.game.domain.vo.Money;
import com.antswar.backend.game.domain.player.Player;

import java.util.List;

public record PlayerInfo(long id, String name, Money balance) {
    public static PlayerInfo from(Player player){
        return new PlayerInfo(player.getId(), player.getName(), player.getMoney());
    }

    public static List<PlayerInfo> from(List<Player> players){
        return players.stream().map(PlayerInfo::from).toList();
    }
}
