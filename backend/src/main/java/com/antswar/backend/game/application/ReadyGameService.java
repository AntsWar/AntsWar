package com.antswar.backend.game.application;

import com.antswar.backend.game.application.dto.response.readyGame.RegisterGameResult;
import com.antswar.backend.game.application.dto.response.GameInfo;
import com.antswar.backend.game.application.port.in.readyGame.JoinGame;
import com.antswar.backend.game.application.port.in.readyGame.RegisterGame;
import com.antswar.backend.game.application.port.in.readyGame.SearchReadyGame;
import com.antswar.backend.game.application.dto.RoomCond;
import com.antswar.backend.game.application.dto.request.readyGame.JoinGameCommand;
import com.antswar.backend.game.application.dto.request.readyGame.RegisterGameCommand;
import com.antswar.backend.game.application.dto.request.readyGame.SearchGameQuery;
import com.antswar.backend.game.domain.player.Player;
import com.antswar.backend.game.domain.game.Game;
import com.antswar.backend.game.application.port.out.GameRepository;
import com.antswar.backend.game.domain.game.GameStatus;
import com.antswar.backend.game.exception.GameException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.antswar.backend.game.exception.GameErrorCode.GAME_NOT_FOUND;

@RequiredArgsConstructor
@Service
public class ReadyGameService implements RegisterGame, JoinGame, SearchReadyGame {
    private final GameRepository repository;

    @Override
    public List<GameInfo> search(SearchGameQuery query) {
        List<Game> games = repository.findAllByCond(new RoomCond(query.name(), GameStatus.READY));
        return games.stream().map(GameInfo::from).toList();
    }

    @Override
    public RegisterGameResult register(RegisterGameCommand command) {
        Game game = repository.save(new Game(command.name(), command.password(), command.host(), command.mode(), command.capacity()));
        return new RegisterGameResult(game.getId());
    }

    @Override
    public void join(JoinGameCommand command) {
        Game game = repository.findById(command.roomId()).orElseThrow(() -> new GameException(GAME_NOT_FOUND));
        Player player = new Player(command.playerId(), command.playerName());
        game.join(player, command.password());
    }


}
