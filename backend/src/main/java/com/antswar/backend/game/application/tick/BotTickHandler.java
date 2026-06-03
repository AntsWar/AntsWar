package com.antswar.backend.game.application.tick;

import com.antswar.backend.game.application.port.out.PlayerRepository;
import com.antswar.backend.game.domain.Game;
import com.antswar.backend.game.domain.player.Player;
import com.antswar.backend.game.domain.vo.Money;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Component
@RequiredArgsConstructor
public class BotTickHandler implements TickHandler{
    private final PlayerRepository playerRepository;
    private final Random random;

    @Override
    public void handle(Game game, LocalDateTime now) {
        List<Player> bots = playerRepository.findAllByGameAndBotIsTrue(game);

        for (Player bot : bots) {
            if (random.nextDouble() > 0.35) {
                continue;
            }
            double multiplier = random.nextDouble(0.95, 1.06);
            Money money = bot.getBalance().times(multiplier);
            if(money.compareTo(Money.of(1_000)) <0){
                money = Money.of(3_000);
            }
            bot.changeBalance(money);
        }
    }
}
