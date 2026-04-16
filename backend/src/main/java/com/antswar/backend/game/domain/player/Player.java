package com.antswar.backend.game.domain.player;

import com.antswar.backend.game.domain.Money;
import com.antswar.backend.game.domain.market.Purchase;
import com.antswar.backend.game.exception.GameException;
import lombok.AccessLevel;
import lombok.Getter;

import java.util.List;

import static com.antswar.backend.game.exception.GameErrorCode.*;
import static org.springframework.util.StringUtils.hasText;

@Getter
public class Player{
    private final String id;
    private final String name;
    private Money money;
    @Getter(AccessLevel.NONE)
    private final Portfolio portfolio = new Portfolio();

    public Player(String id, String name) {
        this.id = id;
        this.name = name;
        this.money = Money.of(1000);
        validate();
    }

    private void validate(){
        if(!hasText(id)) throw new IllegalArgumentException("아이디 필수");
        if (!hasText(name)) throw new IllegalArgumentException("이름 필수");
        if (name.length() > 10) throw new IllegalArgumentException("이름 10자 이하");
    }

    public List<Position> getPortfolio(){
        return portfolio.getPositions();
    }

    public void buy(Purchase purchase, int quantity) {
        Money totalPrice = purchase.calculateTotalPrice(quantity);
        if(money.compareTo(totalPrice) < 0) throw new GameException(MONEY_NOT_ENOUGH);
        portfolio.add(purchase, quantity);
        this.money = this.money.subtract(totalPrice);
    }

    public void sell(Purchase purchase, int quantity) {
        portfolio.subtract(purchase, quantity);
        Money totalPrice = purchase.calculateTotalPrice(quantity);
        this.money = this.money.add(totalPrice);
    }


}