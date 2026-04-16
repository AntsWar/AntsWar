package com.antswar.backend.game.domain.game;

import com.antswar.backend.game.domain.player.Player;
import com.antswar.backend.game.exception.GameException;
import lombok.Getter;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import static com.antswar.backend.game.exception.GameErrorCode.*;

public class Players {
    private final Map<String, Player> players = new ConcurrentHashMap<>();
    @Getter
    private final int capacity;

    public Players(int capacity){
        this.capacity = capacity;
        validate();
    }

    private void validate(){
        if (this.capacity < 1 || this.capacity > 10) throw new IllegalArgumentException("방 인원은 1명 이상 10명 이하");
    }

    public List<Player> toList() {
        return List.copyOf(players.values());
    }

    public boolean hasPlayer(String playerId){
        return players.containsKey(playerId);
    }

    public Player getPlayer(String playerId){
        Player player = players.get(playerId);
        if (player == null) throw new GameException(PLAYER_NOT_FOUND);
        return player;
    }

    public int size(){
        return players.size();
    }

    void join(Player player){
        if (this.players.size() >= this.capacity) throw new GameException(GAME_FULL);

        this.players.putIfAbsent(player.getId(), player);
    }

}
