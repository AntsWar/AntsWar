package com.antswar.backend.game.application;

import com.antswar.backend.game.application.dto.request.runningGame.PurchaseCommand;
import com.antswar.backend.game.application.dto.request.runningGame.GetGameQuery;
import com.antswar.backend.game.application.dto.response.PositionInfo;
import com.antswar.backend.game.application.dto.response.PurchaseInfo;
import com.antswar.backend.game.application.dto.response.runningGame.GetGameResult;
import com.antswar.backend.game.application.dto.response.PlayerInfo;
import com.antswar.backend.game.application.dto.response.runningGame.GetMeResult;
import com.antswar.backend.game.application.port.in.readyGame.StartGame;
import com.antswar.backend.game.application.port.in.runningGame.*;
import com.antswar.backend.game.application.port.out.GameRepository;
import com.antswar.backend.game.domain.game.Game;
import com.antswar.backend.game.domain.market.Purchase;
import com.antswar.backend.game.domain.player.Player;
import com.antswar.backend.game.domain.player.PositionType;
import com.antswar.backend.game.exception.GameException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.antswar.backend.game.exception.GameErrorCode.*;

@RequiredArgsConstructor
@Service
public class RunningGameService implements GetGame, GetMe, BuyPurchase, SellPurchase, StartGame {
    private final GameRepository repository;

    @Override
    public void buy(PurchaseCommand command) {
        Game game = getGame(command.gameId());
        Player player = game.getPlayers().getPlayer(command.playerId());
        Purchase purchase = game.getMarket().getPurchase(command.purchaseId());
        player.buy(purchase, command.type(), command.quantity());
}

    @Override
    public void sell(PurchaseCommand command) {
        Game game = getGame(command.gameId());
        Player player = game.getPlayers().getPlayer(command.playerId());
        Purchase purchase = game.getMarket().getPurchase(command.purchaseId());
        player.sell(purchase, command.type(), command.quantity());
    }

    @Override
    public GetGameResult get(GetGameQuery query) {
        Game game = getGame(query.gameId());
        if(!game.getPlayers().hasPlayer(query.playerId())) throw new GameException(GAME_FORBIDDEN);

        List<PlayerInfo> players = game.getPlayers().toList().stream()
                .map(PlayerInfo::from).toList();
        List<PurchaseInfo> purchases = game.getMarket().getPurchases().stream()
                .map(PurchaseInfo::from).toList();

        return new GetGameResult(players,purchases, game.isHost(query.playerId()));
    }

    @Override
    public GetMeResult me(String gameId, String playerId) {
        Game game = getGame(gameId);
        Player player = game.getPlayers().getPlayer(playerId);
        List<PositionInfo> longPositions = player.getPortfolio(PositionType.LONG).stream().map(position ->
                PositionInfo.from(position, PositionType.LONG)).toList();
        List<PositionInfo> shortPositions = player.getPortfolio(PositionType.SHORT).stream().map(position ->
                PositionInfo.from(position, PositionType.SHORT)).toList();
        return new GetMeResult(PlayerInfo.from(player),longPositions, shortPositions);
    }

    @Override
    public void start(String gameId, String hostId) {
        Game game = repository.findById(gameId).orElseThrow(()-> new GameException(GAME_NOT_FOUND));
        game.start();
    }

    private Game getGame(String gameId) {
        return repository.findById(gameId)
                .orElseThrow(() -> new GameException(GAME_NOT_FOUND));
    }
}
