package com.antswar.backend.game.domain.player;

import com.antswar.backend.game.domain.Game;
import com.antswar.backend.game.domain.Money;
import com.antswar.backend.game.domain.market.Purchase;
import com.antswar.backend.game.domain.market.PurchaseMeta;
import com.antswar.backend.game.domain.room.Room;
import com.antswar.backend.game.exception.GameException;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.*;

import static com.antswar.backend.game.exception.GameErrorCode.*;
import static org.springframework.util.StringUtils.hasText;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Getter
@Table(
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_room_player", columnNames = {"room_id", "player_id"})
        }
)
public class Player{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String playerId;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    private Game game;

    @Embedded
    private Money money;

    @OneToMany(mappedBy = "player", cascade = CascadeType.PERSIST)
    @Getter(AccessLevel.NONE)
    private final List<Position> positions = new ArrayList<>();

    public Player(String playerId, String name) {
        this.playerId = Objects.requireNonNull(playerId);
        this.name = Objects.requireNonNull(name);
        this.money = Money.of(1000);
        validate();
    }

    public void join(Room room){
        this.room = Objects.requireNonNull(room);
    }

    public void joinGame(Game game) {
        this.game = game;
        for (PurchaseMeta meta : PurchaseMeta.values()) {
            positions.add(new Position(this, meta, PositionType.LONG));
            positions.add(new Position(this, meta, PositionType.SHORT));
        }
    }

    private void validate(){
        if (!hasText(name)) throw new IllegalArgumentException("이름 필수");
        if (name.length() > 10) throw new IllegalArgumentException("이름 10자 이하");
        if (playerId.isBlank()) throw new IllegalArgumentException("플레이어 아이디 필수");
    }

    public void buy(Purchase purchase, PositionType type, int quantity) {
        Position position = getPosition(purchase.getMeta(), type);
        Money totalPrice = purchase.calculateTotalPrice(quantity);
        if(money.compareTo(totalPrice) < 0) throw new GameException(PLAYER_NOT_ENOUGH_MONEY);
        position.add(quantity, purchase.getPrice());
        this.money = this.money.subtract(totalPrice);
    }

    public void sell(Purchase purchase, PositionType type, int quantity) {
        Position position = getPosition(purchase.getMeta(), type);
        Money totalPrice = type == PositionType.LONG
                ?purchase.calculateTotalPrice(quantity)
                :position.getAveragePrice().times(2).subtract(purchase.getPrice()).times(quantity);
        this.money = this.money.add(totalPrice);
        position.subtract(quantity);
    }

    public void onDelisted(PurchaseMeta meta){
        positions.forEach(position -> {
            if(position.match(meta)) position.delist();
        });
    }

    public Position getPosition(PurchaseMeta meta, PositionType type) {
        return positions.stream()
                .filter(position -> position.match(meta, type))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("초기 포지션이 존재해야 함"));
    }

    public void earn(Money money){
        this.money = this.money.add(money);
    }

    public List<Position> getPositions(){
        return positions.stream()
                .filter(position -> !position.isEmpty())
                .toList();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Player other)) return false;
        return Objects.equals(playerId, other.playerId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(playerId);
    }
}