package com.antswar.backend.game.application;

import com.antswar.backend.game.application.dto.PlayerInfo;
import com.antswar.backend.game.application.dto.PositionInfo;
import com.antswar.backend.game.application.port.in.*;
import com.antswar.backend.game.application.port.in.request.TradeCommand;
import com.antswar.backend.game.application.port.in.response.GetMeResult;
import com.antswar.backend.game.application.port.out.PlayerRepository;
import com.antswar.backend.game.application.port.out.PurchaseRepository;
import com.antswar.backend.game.application.dto.GameEvent;
import com.antswar.backend.game.domain.item.Item;
import com.antswar.backend.game.domain.player.Player;
import com.antswar.backend.game.domain.purchase.Purchase;
import com.antswar.backend.game.domain.vo.Money;
import com.antswar.backend.game.exception.GameException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;

import static com.antswar.backend.game.exception.GameErrorCode.PLAYER_NOT_FOUND;
import static com.antswar.backend.game.exception.GameErrorCode.PURCHASE_NOT_FOUND;

@RequiredArgsConstructor
@Service
public class PlayerService implements GetMe, Trade, BuyItem {
    private final PlayerRepository playerRepository;
    private final PurchaseRepository purchaseRepository;
    private final ApplicationEventPublisher eventPublisher;
    private final Random random;

    private static final Money GOLDEN_FINGER_REWARD = Money.of(10);

    @Override
    @Transactional
    public void buy(long playerId, Item item, String code) {
        Player player = getPlayer(playerId);
        player.pay(item.getPrice());

        switch (item) {
            case FAKE_NEWS -> eventPublisher.publishEvent(new GameEvent(player.getGame().getId(), "NOTICE", code));
            case GOLDEN_FINGER -> player.earn(GOLDEN_FINGER_REWARD);
            case LUCKY_BOX -> player.earn(Money.of(random.nextLong(10, 2001)));
        }
    }

    @Override
    @Transactional
    public void trade(TradeCommand command) {
        Player player = getPlayer(command.playerId());
        Purchase purchase = purchaseRepository.findById(command.purchaseId()).orElseThrow(() ->
                new GameException(PURCHASE_NOT_FOUND));

        switch (command.orderType()){
            case BUY -> player.buy(purchase, command.positionType(), command.quantity());
            case SELL -> player.sell(purchase, command.positionType(), command.quantity());
        }
    }

    @Override
    @Transactional(readOnly = true)
    public GetMeResult me(long playerId) {
        Player player = getPlayer(playerId);
        List<PositionInfo> positionInfos = player.getPositions().stream()
                .map(PositionInfo::from).toList();
        return new GetMeResult(PlayerInfo.from(player), positionInfos);
    }

    private Player getPlayer(long id){
        return playerRepository.findById(id).orElseThrow(() -> new GameException(PLAYER_NOT_FOUND));
    }
}
