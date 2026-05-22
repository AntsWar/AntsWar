package com.antswar.backend.game.domain;

import com.antswar.backend.game.domain.player.Player;
import com.antswar.backend.game.domain.purchase.Purchase;
import com.antswar.backend.game.domain.purchase.PurchaseMeta;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private Long id;

    @Getter
    private Instant startedAt;
    @Getter
    private Instant endedAt;

    @Getter
    @OneToMany(mappedBy = "game", cascade = CascadeType.PERSIST)
    private final List<Purchase> purchases = new ArrayList<>();

    @OneToMany(mappedBy = "game", cascade = CascadeType.PERSIST)
    private final List<Player> players = new ArrayList<>();

    public Game(Instant startedAt, Instant endedAt){
        this.startedAt = startedAt;
        this.endedAt = endedAt;
        for (PurchaseMeta meta : PurchaseMeta.values()) {
            purchases.add(new Purchase(this, meta));
        }
        players.add(Player.bot("거미",this));
        players.add(Player.bot("여왕개미",this));
        players.add(Player.bot("큰개미",this));
        players.add(Player.bot("황금사과",this));
        players.add(Player.bot("금개미",this));
    }

    public List<Purchase> getPurchases(boolean isDelisted) {
        return purchases.stream()
                .filter(purchase -> purchase.isDelisted() == isDelisted)
                .toList();
    }
}
