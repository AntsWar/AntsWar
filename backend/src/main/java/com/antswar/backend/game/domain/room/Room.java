package com.antswar.backend.game.domain.room;

import com.antswar.backend.game.domain.Game;
import com.antswar.backend.game.domain.player.Player;
import com.antswar.backend.game.exception.GameException;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.time.Instant;
import java.util.*;

import static com.antswar.backend.game.exception.GameErrorCode.*;
import static org.springframework.util.StringUtils.hasText;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Room {
    @Id
    private String id;
    @Column(nullable = false)
    private String name;
    private String password;

    @Column(nullable = false)
    private String hostId;

    @OneToMany(mappedBy = "room", cascade = CascadeType.PERSIST)
    private final Set<Player> players = new HashSet<>();
    private int capacity;

    @Embedded
    private RoomMode mode;

    @OneToOne(mappedBy = "room", cascade = CascadeType.PERSIST)
    private Game game;

    public Room(String name, String password, String hostId, RoomMode mode, int capacity){
        this.id = UUID.randomUUID().toString();
        this.name = Objects.requireNonNull(name, "방 이름 필수");
        this.password = password;
        this.hostId = Objects.requireNonNull(hostId,"호스트 필수");
        this.capacity = capacity;
        this.mode = mode;
        validate();
    }

    private void validate(){
        if (name.isBlank()) throw new IllegalArgumentException("방 이름 필수");
        if (capacity < 1) throw new IllegalArgumentException("방 인원은 1명 이상");
    }

    public boolean hasPassword(){
        return hasText(password);
    }

    public void join(Player player, String password){
        if(this.getStatus() == RoomStatus.FINISHED) throw new GameException(GAME_FINISHED);
        if (hasPlayer(player)) return;
        if (this.getStatus() != RoomStatus.WAITING) throw new GameException(GAME_NOT_WAITING);
        if (hasPassword()){
            if (!hasText(password)) throw new GameException(ROOM_REQUIRE_PASSWORD);
            if (!this.password.equals(password))throw new GameException(ROOM_INVALID_PASSWORD);
        }
        if(this.players.size() >= capacity) throw new GameException(ROOM_FULL);
        player.join(this);
        this.players.add(player);
    }

    public boolean hasPlayer(Player player) {
        return players.contains(player);
    }

    public boolean isHost(String playerId){
        return hostId.equals(playerId);
    }

    public void ready(String playerId){
        if(this.getStatus() != RoomStatus.WAITING) return;
        if (!isHost(playerId)) throw new GameException(GAME_FORBIDDEN);

        this.game = new Game(this);
        this.players.forEach(player -> player.joinGame(this.game));
    }

    public void finishIfEnded(Instant now) {
        if (this.getStatus() != RoomStatus.RUNNING) return;
        if (this.mode.getType() == RoomModeType.TIME){
            long elapsed = Duration.between(this.game.getStartedAt(), now).getSeconds();
            // 임시방편으로 해놓음. 재대로하면 틱으로 끌고 가야할듯싶음
            if (elapsed >= this.getMode().getTarget()-1) {
                this.game.finish(now);
            }
        }
    }

    public RoomStatus getStatus() {
        if (game == null) return  RoomStatus.WAITING;
        return this.game.getStatus();
    }
}
