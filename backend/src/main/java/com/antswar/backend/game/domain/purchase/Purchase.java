package com.antswar.backend.game.domain.purchase;

import com.antswar.backend.game.domain.Game;
import com.antswar.backend.game.domain.player.Position;
import com.antswar.backend.game.domain.vo.Money;
import com.antswar.backend.game.exception.GameErrorCode;
import com.antswar.backend.game.exception.GameException;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Purchase {
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Game game;

    @Getter
    private PurchaseMeta meta;
    @Getter
    @Embedded
    private Money price;

    private int respawnTick;
    @Getter
    private boolean isDelisted;

    @OneToMany(mappedBy = "purchase")
    private final List<Position> positions = new ArrayList<>();

    private static final int RESPAWN_TICKS = 4;
    private static final Money BASE_PRICE = Money.of(1000);
    private static final Money MIN_ACTIVE_PRICE = Money.of(100);
    private static final Money ZERO_PRICE = Money.of(0);

    public Purchase(Game game, PurchaseMeta meta){
        this.game = Objects.requireNonNull(game);
        this.meta = Objects.requireNonNull(meta);
        this.price = BASE_PRICE;
        this.respawnTick = 0;
        this.isDelisted = false;
    }

    public Money calculateTotalPrice(int quantity) {
        if (quantity <= 0) return ZERO_PRICE;

        return price.times(quantity);
    }

    public void updatePrice(double rate) {
        if (isDelisted) return;

        this.price = price.times(1 + rate);
    }

    public boolean shouldDelist() {
        return !isDelisted && price.compareTo(MIN_ACTIVE_PRICE) <= 0;
    }

    public void delist() {
        this.price = ZERO_PRICE;
        this.isDelisted = true;
        this.respawnTick = RESPAWN_TICKS;
        this.positions.forEach(Position::delist);
    }

    public void decreaseRespawnTick() {
        if (!isDelisted) return;

        this.respawnTick--;

        if (this.respawnTick <= 0) {
            respawn();
        }
    }

    private void respawn() {
        this.price = BASE_PRICE;
        this.isDelisted = false;
        this.respawnTick = 0;
    }
}
