package com.antswar.backend.game.domain.news;

import com.antswar.backend.game.domain.Game;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@Entity
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Game game;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NewsMeta meta;
    private int remainingTick;

    private static final int DEFAULT_REMAINING_TICKS = 4;

    public News(Game game, NewsMeta meta){
        this.game = game;
        this.meta = meta;
        this.remainingTick = DEFAULT_REMAINING_TICKS;
    }

    public void tick() {
        this.remainingTick--;
    }

    public boolean isPending() {
        return remainingTick > 0;
    }

    public boolean match(NewsMeta meta){
        return this.meta == meta;
    }
}
