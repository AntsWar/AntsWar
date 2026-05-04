package com.antswar.backend.game.domain.purchase;

import com.antswar.backend.game.domain.game.Game;
import com.antswar.backend.game.domain.vo.Money;
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
    @JoinColumn(nullable = false)
    private Game game;
    private PurchaseMeta meta;
    private Money price;
    private boolean isDelisted;

    private static final Money BASE_PRICE = Money.of(200);
    private static final Money MIN_ACTIVE_PRICE = Money.of(100);
    private static final Money ZERO_PRICE = Money.of(0);

    public Purchase(Game game, PurchaseMeta meta){
        this.game = Objects.requireNonNull(game);
        this.meta = Objects.requireNonNull(meta);
        this.price = BASE_PRICE;
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

    public void updatePrices(double rate) {
        this.price = price.times(1 + rate);

        if (this.price.compareTo(MIN_ACTIVE_PRICE) <= 0) {
            delisted();
        }
    }

    private void delisted(){
        this.price = ZERO_PRICE;
        this.isDelisted = true;
    }

    public void respawn() {
        this.price = BASE_PRICE;
        this.isDelisted = false;
    }
}
