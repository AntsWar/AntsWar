package com.antswar.backend.game.application.tick;

import com.antswar.backend.game.application.dto.PlayerInfo;
import com.antswar.backend.game.application.dto.PurchaseInfo;
import com.antswar.backend.game.application.dto.GameEvent;
import com.antswar.backend.game.application.port.out.PlayerRepository;
import com.antswar.backend.game.domain.Game;
import com.antswar.backend.game.domain.player.Player;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Order(999)
@Component
@RequiredArgsConstructor
public class TickResultHandler implements TickHandler {
    private final PlayerRepository playerRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Override
    public void handle(Game game, LocalDateTime now) {
        List<Player> players = game.getActivePlayers();
        TickResult result = new TickResult(
                PurchaseInfo.from(game.getPurchases(false)),
                PlayerInfo.from(players),
                now
        );

        eventPublisher.publishEvent(new GameEvent("GAME_UPDATED", result));
    }

    public record TickResult(List<PurchaseInfo> purchases, List<PlayerInfo> players, LocalDateTime serverTime) {
    }
}
