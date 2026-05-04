package com.antswar.backend.game.application;

import com.antswar.backend.game.application.dto.*;
import com.antswar.backend.game.application.port.in.*;
import com.antswar.backend.game.application.port.in.request.TradeCommand;
import com.antswar.backend.game.application.port.in.response.GetMeResult;
import com.antswar.backend.game.application.port.in.request.JoinGameCommand;
import com.antswar.backend.game.application.port.in.response.JoinGameResult;
import com.antswar.backend.game.application.port.out.GameRepository;
import com.antswar.backend.game.application.port.out.NewsGenerator;
import com.antswar.backend.game.application.port.out.PlayerRepository;
import com.antswar.backend.game.application.port.out.PurchaseRepository;
import com.antswar.backend.game.domain.vo.Money;
import com.antswar.backend.game.domain.game.Game;
import com.antswar.backend.game.domain.event.GameDomainEvent;
import com.antswar.backend.game.domain.event.NewsEvent;
import com.antswar.backend.game.domain.event.PurchaseDelistedEvent;
import com.antswar.backend.game.domain.policy.PricePolicy;
import com.antswar.backend.game.domain.purchase.Purchase;
import com.antswar.backend.game.domain.purchase.PurchaseMeta;
import com.antswar.backend.game.domain.game.PurchaseRespawnBoard;
import com.antswar.backend.game.domain.news.News;
import com.antswar.backend.game.domain.game.NewsBoard;
import com.antswar.backend.game.domain.player.Player;
import com.antswar.backend.game.exception.GameException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import static com.antswar.backend.game.exception.GameErrorCode.*;

@Transactional
@RequiredArgsConstructor
@Service
public class GameService implements GetMe, Trade, EarnByClick, JoinGame, LeavePlayer {
    private final GameRepository gameRepository;
    private final PlayerRepository playerRepository;
    private final PurchaseRepository purchaseRepository;

    private final NewsBoard newsBoard;
    private final PurchaseRespawnBoard respawnBoard;

    private final PricePolicy pricePolicy;
    private final NewsGenerator newsGenerator;

    private final Clock clock;

    private static final Money CLICK_REWARD = Money.of(30);

    @Override
    public void trade(TradeCommand command) {
        Player player = getPlayer(command.playerId());
        Purchase purchase = getPurchase(command.purchaseId());

        switch (command.orderType()){
            case BUY -> player.buy(purchase, command.positionType(), command.quantity());
            case SELL -> player.sell(purchase, command.positionType(), command.quantity());
        }
    }

    @Override
    public GetMeResult me(long playerId) {
        Player player = getPlayer(playerId);
        List<PositionInfo> positionInfos= player.getPositions().stream()
                .map(PositionInfo::from).toList();
        return new GetMeResult(PlayerInfo.from(player), positionInfos);
    }

    @Override
    public void earnByClick(long playerId) {
        Player player = getPlayer(playerId);
        player.earn(CLICK_REWARD);
    }

    @Override
    public JoinGameResult join(JoinGameCommand command) {
        Instant now = clock.instant();
        Game game = gameRepository.findCurrentGame(now).orElseThrow(()-> new GameException(GAME_NOT_FOUND));
        Player player = playerRepository.save(new Player(command.playerName(), game));

        return new JoinGameResult(
                GameInfo.of(game,
                        PurchaseInfo.from(game.getPurchases()),
                        PlayerInfo.from(getPlayers(game)),
                        now),
                PlayerInfo.from(player));
    }

    public TickResult tick(Instant now){
        Game game = getOrStartCurrentGame(now);
        List<GameDomainEvent> events = new ArrayList<>();
        List<Purchase> purchases = game.getPurchases();
        List<Player> players = getPlayers(game);

        purchases.forEach(purchase -> {
            PurchaseMeta meta = purchase.getMeta();
            int impact = newsBoard.impactOf(meta);
            double rate = pricePolicy.nextRate(meta, impact);
            purchase.updatePrices(rate);
            if(purchase.isDelisted()){
                respawnBoard.reserve(meta);
                players.forEach(player -> player.onDelisted(meta));
                events.add(new PurchaseDelistedEvent(meta));
            }
        });

        List<PurchaseMeta> respawns = respawnBoard.tick();
        respawns.forEach(meta -> {
            Purchase purchase = game.getPurchase(meta);
            purchase.respawn();
        });
        newsBoard.tick();
        newsGenerator.generate().ifPresent(meta -> {
            newsBoard.add(new News(meta));
            events.add(new NewsEvent(meta));
        });

        return new TickResult(
                GameInfo.of(
                        game,
                        PurchaseInfo.from(purchases),
                        PlayerInfo.from(players),
                        now),
                events);
    }

    @Override
    public void leave(long id) {
        playerRepository.findById(id).ifPresent(Player::leave);
    }

    private Player getPlayer(long id){
        return playerRepository.findById(id).orElseThrow(() -> new GameException(PLAYER_NOT_FOUND));
    }

    private List<Player> getPlayers(Game game){
        return playerRepository.findAllByGameAndDeActiveIsFalse(game);
    }

    private Purchase getPurchase(long id){
        return purchaseRepository.findById(id).orElseThrow(() -> new GameException(PURCHASE_NOT_FOUND));
    }

    private Game getOrStartCurrentGame(Instant now) {
        Instant startedAt = now.truncatedTo(ChronoUnit.HOURS);
        Instant endedAt = startedAt.plus(1, ChronoUnit.HOURS);

        return gameRepository.findCurrentGame(now)
                .orElseGet(() -> gameRepository.save(Game.start(startedAt, endedAt)));
    }
}
