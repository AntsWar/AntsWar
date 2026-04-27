package com.antswar.backend.game.domain.market;

import com.antswar.backend.game.domain.Game;
import com.antswar.backend.game.domain.Money;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PurchaseRespawn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false)
    private Game game;
    @ManyToOne(optional = false)
    private Purchase purchase;
    private int remainingTick;

    private static final Money RESPAWN_PRICE = Money.of(200);
    private static final int REMAINING_TICK = 4;

    public PurchaseRespawn(Game game, Purchase purchase){
        this.game = game;
        this.purchase = purchase;
        this.remainingTick = REMAINING_TICK;
    }

    public void tick() {
        if (remainingTick <= 0) return;
        this.remainingTick--;
        if (this.remainingTick == 0) purchase.respawn(RESPAWN_PRICE);
    }

    public boolean isPending() {
        return remainingTick > 0;
    }
}