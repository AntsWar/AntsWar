package com.antswar.backend.game.domain;

import com.antswar.backend.game.domain.player.Player;
import com.antswar.backend.game.domain.purchase.Purchase;
import com.antswar.backend.game.domain.purchase.PurchaseMeta;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Game{
    @Id
    @Getter
    private Long id;

    @Getter
    private LocalDateTime startedAt;
    @Getter
    private LocalDateTime endedAt;

    @Getter
    @OneToMany(mappedBy = "game", cascade = CascadeType.PERSIST)
    private final List<Purchase> purchases = new ArrayList<>();

    @OneToMany(mappedBy = "game", cascade = CascadeType.PERSIST)
    private final List<Player> players = new ArrayList<>();

    public Game(long id, LocalDateTime startedAt, LocalDateTime endedAt){
        this.id = id;
        this.startedAt = startedAt;
        this.endedAt = endedAt;

        for (PurchaseMeta meta : PurchaseMeta.values()) {
            purchases.add(new Purchase(this, meta));
        }
        players.add(Player.bot("거미",this));
        players.add(Player.bot("ㅇㅇ",this));
        players.add(Player.bot("한겨",this));
        players.add(Player.bot("황금사과",this));
        players.add(Player.bot("금개미",this));
        players.add(Player.bot("디갤장",this));
        players.add(Player.bot("도미닉호",this));
        players.add(Player.bot(".",this));
        players.add(Player.bot("prodo",this));
        players.add(Player.bot("noto",this));
    }

    public List<Purchase> getPurchases(boolean includeDelisted) {
        return purchases.stream()
                .filter(purchase -> includeDelisted || !purchase.isDelisted())
                .toList();
    }

    public List<Player> getActivePlayers() {
        return this.players.stream()
                .filter(player -> !player.isDeActive())
                .toList();
    }
}
