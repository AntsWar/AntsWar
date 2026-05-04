package com.antswar.backend.game.domain.game;

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

    @OneToMany(mappedBy = "game", cascade = CascadeType.PERSIST)
    private final List<Purchase> purchases = new ArrayList<>();

    private Game(Instant startedAt, Instant endedAt){
        this.startedAt = startedAt;
        this.endedAt = endedAt;
    }

    public List<Purchase> getPurchases(){
        return purchases.stream()
                .filter(purchase -> !purchase.isDelisted())
                .toList();
    }

    public Purchase getPurchase(PurchaseMeta meta){
        return purchases.stream()
                .filter(purchase -> purchase.match(meta))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 상품"));
    }

    public static Game start(Instant startedAt, Instant endedAt) {
        Game game = new Game(startedAt, endedAt);
        game.initializePurchases();
        return game;
    }

    private void initializePurchases() {
        for (PurchaseMeta meta : PurchaseMeta.values()) {
            purchases.add(new Purchase(this, meta));
        }
    }
}
