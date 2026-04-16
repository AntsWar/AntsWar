package com.antswar.backend.game.domain.game;

import com.antswar.backend.game.domain.market.Market;
import com.antswar.backend.game.domain.player.Player;
import com.antswar.backend.game.exception.GameException;
import lombok.Getter;

import java.util.*;

import static com.antswar.backend.game.exception.GameErrorCode.*;
import static org.springframework.util.StringUtils.hasText;

@Getter
public class Game {
    private final String id;
    private final String name;
    private final String password;
    private final GameMode mode;
    private final String hostId;
    private GameStatus status;

    private final Market market= new Market();
    private final Players players;

    public Game(String name, String password, String hostId, GameMode mode, int capacity){
        this.id = UUID.randomUUID().toString();
        this.name = Objects.requireNonNull(name, "방 이름 필수");
        this.password = password;
        this.mode = Objects.requireNonNull(mode,"모드 필수");
        this.hostId = Objects.requireNonNull(hostId,"호스트 필수");
        this.status = GameStatus.READY;

        this.players = new Players(capacity);
        validate();
    }

    public boolean hasPassword(){
        return hasText(this.password);
    }

    public boolean isHost(String playerId){
        return Objects.equals(hostId, playerId);
    }

    private void validate(){
        if (this.password != null && this.password.length() > 10) throw new IllegalArgumentException("비밀번호는 10자 이하");
        if (this.name.isBlank()) throw new IllegalArgumentException("방 이름 필수");
        if (this.name.length() > 20) throw new IllegalArgumentException("방 이름 20자 이하");
    }

    public void join(Player player, String password){
        if (this.status != GameStatus.READY) throw new GameException(GAME_NOT_READY);
        if (hasPassword() && !this.password.equals(password)) throw new GameException(GAME_INVALID_PASSWORD);
        this.players.join(player);
    }

    public void start(){
        if(this.status == GameStatus.FINISHED) throw new GameException(GAME_FINISHED);
        this.status = GameStatus.RUNNING;
    }
}
