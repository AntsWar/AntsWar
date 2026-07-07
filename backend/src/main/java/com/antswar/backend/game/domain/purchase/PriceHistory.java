package com.antswar.backend.game.domain.purchase;

import com.antswar.backend.game.domain.vo.Money;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PriceHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "purchase_id", nullable = false)
    private Purchase purchase;

    @Embedded
    private Money price;

    private LocalDateTime recordedAt;

    public PriceHistory(Purchase purchase, Money price, LocalDateTime recordedAt) {
        this.purchase = purchase;
        this.price = price;
        this.recordedAt = recordedAt;
    }
}
