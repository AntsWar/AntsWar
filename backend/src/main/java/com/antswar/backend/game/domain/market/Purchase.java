package com.antswar.backend.game.domain.market;

import com.antswar.backend.game.domain.Money;
import com.antswar.backend.game.domain.Game;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;
    private PurchaseMeta meta;
    private Money price;
    @Getter(AccessLevel.NONE)
    private boolean deActive;

    private static final Money MIN_ACTIVE_PRICE = Money.of(100);
    private static final Money ZERO_PRICE = Money.of(0);

    public boolean isActive(){
        return !deActive;
    }

    public Purchase(Game game, PurchaseMeta meta, Money price){
        this.game = Objects.requireNonNull(game);
        this.meta = Objects.requireNonNull(meta);
        this.price = Objects.requireNonNull(price);
    }

    public Money calculateTotalPrice(int quantity) {
        validateQuantity(quantity);
        return price.times(quantity);
    }

    private void validateQuantity(int quantity) {
        if (quantity <= 0) throw new IllegalArgumentException("수량은 1 이상");
    }

    public boolean match(PurchaseMeta meta){
        return this.meta.equals(meta);
    }

    public void updatePrices() {
        double rate = PricePolicy.nextRate(this.meta);
        this.price = price.times(1 + rate);
        if (this.price.compareTo(MIN_ACTIVE_PRICE) <= 0) {
            this.price = ZERO_PRICE;
            this.deActive = true;
        }
    }

    public void respawn(Money price) {
        this.deActive = false;
        this.price = price;
    }
}
