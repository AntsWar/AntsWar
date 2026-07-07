package com.antswar.backend.game.application;

import com.antswar.backend.game.application.dto.*;
import com.antswar.backend.game.application.port.in.*;
import com.antswar.backend.game.application.port.in.request.JoinGameCommand;
import com.antswar.backend.game.application.port.in.response.JoinGameResult;
import com.antswar.backend.game.application.port.out.GameRepository;
import com.antswar.backend.game.application.port.out.PlayerRepository;
import com.antswar.backend.game.application.port.out.PriceHistoryRepository;
import com.antswar.backend.game.domain.Game;
import com.antswar.backend.game.domain.player.Player;
import com.antswar.backend.game.domain.purchase.PriceHistory;
import com.antswar.backend.game.domain.purchase.Purchase;

import com.antswar.backend.game.exception.GameException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.List;

import static com.antswar.backend.game.exception.GameErrorCode.*;

@RequiredArgsConstructor
@Service
public class GameService implements JoinGame, LeaveGame {
    private final GameRepository gameRepository;
    private final PlayerRepository playerRepository;
    private final PriceHistoryRepository priceHistoryRepository;
    private final GameIdPolicy gameIdPolicy;
    private final ApplicationEventPublisher eventPublisher;
    private final Clock clock;

    @Transactional
    @Override
    public JoinGameResult join(JoinGameCommand command) {
        long gameId = gameIdPolicy.currentGameId();
        Game game = gameRepository.findById(gameId).orElseThrow(()-> new GameException(GAME_NOT_FOUND));
        Player player = playerRepository.save(Player.user(command.playerName(), game));

        eventPublisher.publishEvent(new ChatInfo("SYSTEM", player.getName() + "님이 입장하셨습니다."));

        List<Purchase> purchases = game.getPurchases();
        List<Long> purchaseIds = purchases.stream().map(Purchase::getId).toList();
        LocalDateTime since = LocalDateTime.now(clock).minusMinutes(5);
        List<PriceHistory> histories = priceHistoryRepository.findSince(purchaseIds, since);

        return new JoinGameResult(
                GameInfo.of(game,
                        PurchaseInfo.from(purchases, histories, game.getStartedAt()),
                        PlayerInfo.from(game.getActivePlayers()),
                        LocalDateTime.now(clock)),
                PlayerInfo.from(player));
    }

    @Override
    @Transactional
    public void leave(long id) {
        playerRepository.findById(id).ifPresent(Player::leave);
    }

    private List<Player> getPlayers(Game game){
        return playerRepository.findTop5ByGameOrderByBalanceAmountDesc(game);
    }

}
