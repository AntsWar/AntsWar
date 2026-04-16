package com.antswar.backend.game.application;

import com.antswar.backend.game.application.dto.RoomCond;
import com.antswar.backend.game.application.port.out.GameRepository;
import com.antswar.backend.game.domain.game.Game;
import com.antswar.backend.game.domain.game.GameStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class MarketScheduler {

    private final GameRepository gameRepository;

    @Scheduled(fixedDelay = 5000)
    public void updateMarkets() {
        List<Game> games = gameRepository.findAllByCond(new RoomCond(null, GameStatus.RUNNING));
        games.forEach(game-> game.getMarket().updatePrices());
    }
}
