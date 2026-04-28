package com.antswar.backend.game.domain;

import com.antswar.backend.game.domain.event.GameDomainEvent;
import com.antswar.backend.game.domain.event.NewsEvent;
import com.antswar.backend.game.domain.event.PurchaseDelistedEvent;
import com.antswar.backend.game.domain.market.Purchase;
import com.antswar.backend.game.domain.market.PurchaseMeta;
import com.antswar.backend.game.domain.market.PurchaseRespawn;
import com.antswar.backend.game.domain.news.News;
import com.antswar.backend.game.application.port.out.NewsGenerator;
import com.antswar.backend.game.domain.news.NewsMeta;
import com.antswar.backend.game.domain.player.OrderType;
import com.antswar.backend.game.domain.player.Player;
import com.antswar.backend.game.domain.player.PositionType;
import com.antswar.backend.game.domain.room.Room;
import com.antswar.backend.game.domain.room.RoomStatus;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Game {
    @Id
    private String id;

    private Instant startedAt;
    private Instant endedAt;

    @OneToOne(mappedBy = "game", optional = false)
    private Room room;

    @OneToMany(mappedBy = "game")
    private final List<Player> players = new ArrayList<>();

    @Getter(AccessLevel.NONE)
    @OneToMany(mappedBy = "game", cascade = CascadeType.PERSIST)
    private final List<Purchase> purchases = new ArrayList<>();

    @OneToMany(mappedBy = "game", cascade = CascadeType.PERSIST)
    private final List<PurchaseRespawn> purchaseRespawns = new ArrayList<>();

    @OneToMany(mappedBy = "game", cascade = CascadeType.PERSIST)
    private final List<News> news = new ArrayList<>();

    public Game(Room room){
        this.id = room.getId();
        this.room = room;
        for (PurchaseMeta meta : PurchaseMeta.values()) {
            purchases.add(new Purchase(this, meta, Money.of(200)));
        }
    }

    public List<GameDomainEvent> tick(NewsGenerator newsGenerator) {
        List<GameDomainEvent> events = new ArrayList<>();
        List<News> activeNews = this.getActiveNews();

        purchases.forEach((purchase) -> {
            if(!purchase.isActive()) return;
            purchase.updatePrices(activeNews);
            if(purchase.isActive()) return;
            purchaseRespawns.add(new PurchaseRespawn(this, purchase));
            players.forEach(player -> player.onDelisted(purchase.getMeta()));
            events.add(new PurchaseDelistedEvent(purchase.getMeta()));
        });
        purchaseRespawns.stream()
                .filter(PurchaseRespawn::isPending)
                .forEach(PurchaseRespawn::tick);
        activeNews.forEach(News::tick);
        this.addNews(newsGenerator, activeNews)
                .ifPresent((n)-> events.add(new NewsEvent(n.getMeta())));
        return events;
    }

    public void trade(Player player, OrderType orderType, PurchaseMeta purchaseMeta, PositionType positionType, int quantity){
        Purchase purchase = getPurchase(purchaseMeta);
        switch (orderType){
            case BUY -> player.buy(purchase, positionType, quantity);
            case SELL -> player.sell(purchase, positionType, quantity);
        }
    }

    public List<Purchase> getPurchases(){
        return purchases.stream()
                .filter(Purchase::isActive)
                .toList();
    }

    private Purchase getPurchase(PurchaseMeta meta) {
        return this.getPurchases().stream()
                .filter(purchase -> purchase.match(meta))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 상품"));
    }

    public RoomStatus getStatus(){
        if (this.startedAt == null) return RoomStatus.READY;
        if (this.endedAt == null) return RoomStatus.RUNNING;
        return RoomStatus.FINISHED;
    }

    public void start(Instant now){
        this.startedAt = now;
    }

    public void finish(Instant now) {
        this.endedAt = now;
    }

    private Optional<News> addNews(NewsGenerator generator, List<News> activeNews) {
        Optional<NewsMeta> metaOptional = generator.generate();
        if (metaOptional.isEmpty()) return Optional.empty();
        NewsMeta meta = metaOptional.get();
        boolean duplicated = activeNews.stream().anyMatch(news -> news.match(meta));
        if (duplicated) return Optional.empty();
        News news = new News(this, meta);
        this.news.add(news);
        return Optional.of(news);
    }

    public List<News> getActiveNews(){
        return news.stream().filter(News::isPending).toList();
    }
}
