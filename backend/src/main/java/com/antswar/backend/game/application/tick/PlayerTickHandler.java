package com.antswar.backend.game.application.tick;

import com.antswar.backend.game.application.dto.PlayerEvent;
import com.antswar.backend.game.domain.Game;
import com.antswar.backend.game.domain.player.Player;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class PlayerTickHandler implements TickHandler{
    private final ApplicationEventPublisher eventPublisher;

    @Override
    public void handle(Game game, LocalDateTime now) {
        List<Player> players = game.getActivePlayers();

        players.forEach(player -> {
            if(player.isBankrupt()){
                player.leave();
                eventPublisher.publishEvent(new PlayerEvent(player.getId(), "BANKRUPT"));
            }
        });
    }
}
