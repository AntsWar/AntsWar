package com.antswar.backend.game.application;

import com.antswar.backend.game.application.dto.*;
import com.antswar.backend.game.application.port.in.*;
import com.antswar.backend.game.application.port.in.request.JoinGameCommand;
import com.antswar.backend.game.application.port.in.response.JoinGameResult;
import com.antswar.backend.game.application.port.out.GameRepository;
import com.antswar.backend.game.application.port.out.PlayerRepository;
import com.antswar.backend.game.domain.Game;
import com.antswar.backend.game.domain.player.Player;
import com.antswar.backend.game.exception.GameException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.Instant;
import java.util.List;

import static com.antswar.backend.game.exception.GameErrorCode.*;

@RequiredArgsConstructor
@Service
public class GameService implements JoinGame, LeaveGame {
    private final GameRepository gameRepository;
    private final PlayerRepository playerRepository;
    private final Clock clock;

    @Transactional
    @Override
    public JoinGameResult join(JoinGameCommand command) {
        Instant now = clock.instant();
        Game game = gameRepository.findCurrentGame(now).orElseThrow(()-> new GameException(GAME_NOT_FOUND));
        Player player = playerRepository.save(Player.user(command.playerName(), game));

        return new JoinGameResult(
                GameInfo.of(game,
                        PurchaseInfo.from(game.getPurchases(false)),
                        PlayerInfo.from(getPlayers(game)),
                        now),
                PlayerInfo.from(player));
    }

    @Override
    @Transactional
    public void leave(long id) {
        playerRepository.findById(id).ifPresent(Player::leave);
    }

    private List<Player> getPlayers(Game game){
        return playerRepository.findAllByGameAndDeActiveIsFalse(game);
    }

}
