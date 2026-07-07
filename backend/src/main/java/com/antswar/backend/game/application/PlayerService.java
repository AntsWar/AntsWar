package com.antswar.backend.game.application;

import com.antswar.backend.game.application.dto.PlayerInfo;
import com.antswar.backend.game.application.dto.PositionInfo;
import com.antswar.backend.game.application.port.in.*;
import com.antswar.backend.game.application.port.in.request.BuyPurchaseCommand;
import com.antswar.backend.game.application.port.in.request.SellPurchaseCommand;
import com.antswar.backend.game.application.port.in.response.BuyRumorResult;
import com.antswar.backend.game.application.port.in.response.GetMeResult;
import com.antswar.backend.game.application.port.out.PlayerRepository;
import com.antswar.backend.game.application.port.out.PositionRepository;
import com.antswar.backend.game.application.port.out.PurchaseRepository;
import com.antswar.backend.game.application.dto.GameEvent;
import com.antswar.backend.game.domain.item.Item;
import com.antswar.backend.game.domain.player.Player;
import com.antswar.backend.game.domain.player.Position;
import com.antswar.backend.game.domain.purchase.Purchase;
import com.antswar.backend.game.domain.vo.Money;
import com.antswar.backend.game.exception.GameException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;

import static com.antswar.backend.game.exception.GameErrorCode.*;

@RequiredArgsConstructor
@Service
public class PlayerService implements GetMe, PurchaseTrade, BuyItem {
    private final PlayerRepository playerRepository;
    private final PositionRepository positionRepository;
    private final PurchaseRepository purchaseRepository;
    private final ApplicationEventPublisher eventPublisher;
    private final RumorBoard rumorBoard;
    private final Random random;

    private static final Money GOLDEN_FINGER_REWARD = Money.of(10);

    @Override
    @Transactional
    public void buyItem(long playerId, Item item) {
        Player player = getPlayer(playerId);
        player.pay(item.getPrice());

        switch (item) {
//            case FAKE_NEWS -> { eventPublisher.publishEvent(new GameEvent("NOTICE", code)); yield null; }
            case GOLDEN_FINGER -> player.earn(GOLDEN_FINGER_REWARD);
            case LUCKY_BOX -> player.earn(Money.of(random.nextLong(10, 2001)));
        }
    }

    @Transactional
    @Override
    public BuyRumorResult buyRumor(long playerId, Item item, String category) {
        Player player = getPlayer(playerId);
        player.pay(item.getPrice());
        return switch (item) {
            case RUMOR_BASIC -> new BuyRumorResult(rumorBoard.getBasicRumor(category), "RUMOR_BASIC");
            case RUMOR_PREMIUM -> new BuyRumorResult(rumorBoard.getPremiumRumor(category), "RUMOR_PREMIUM");
            default -> throw new GameException(UNSUPPORTED_ITEM);
        };
    }

    @Override
    @Transactional
    public void buy(BuyPurchaseCommand command) {
        Player player = getPlayer(command.playerId());
        Purchase purchase = purchaseRepository.findById(command.purchaseId()).orElseThrow(() ->
                new GameException(PURCHASE_NOT_FOUND));
        player.buy(purchase, command.positionType(), command.quantity());
    }

    @Override
    @Transactional
    public void sell(SellPurchaseCommand command) {
        Player player = getPlayer(command.playerId());
        Position position = positionRepository.findById(command.positionId()).orElseThrow();
        player.sell(position, command.quantity());
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
