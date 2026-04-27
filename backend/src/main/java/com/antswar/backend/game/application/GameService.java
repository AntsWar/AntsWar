package com.antswar.backend.game.application;

import com.antswar.backend.game.application.port.in.game.request.OrderCommand;
import com.antswar.backend.game.application.dto.PositionInfo;
import com.antswar.backend.game.application.dto.PlayerInfo;
import com.antswar.backend.game.application.port.in.game.response.GetMeResult;
import com.antswar.backend.game.application.port.in.game.*;
import com.antswar.backend.game.application.port.out.persistence.PlayerRepository;
import com.antswar.backend.game.application.port.out.persistence.RoomRepository;
import com.antswar.backend.game.domain.Money;
import com.antswar.backend.game.domain.Game;
import com.antswar.backend.game.domain.player.Player;
import com.antswar.backend.game.domain.room.Room;
import com.antswar.backend.game.domain.room.RoomStatus;
import com.antswar.backend.game.exception.GameException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.util.List;

import static com.antswar.backend.game.exception.GameErrorCode.*;

@Transactional
@RequiredArgsConstructor
@Service
public class GameService implements GetMe, Trade, EarnByClick {
    private final PlayerRepository playerRepository;
    private final RoomRepository roomRepository;
    private final Clock clock;
    private static final Money CLICK_REWARD = Money.of(30);

    @Override
    public void order(OrderCommand command) {
        Game game = getGame(command.gameId());
        Player player = getPlayer(command.gameId(),  command.playerId());
        game.trade(player, command.orderType(), command.purchaseMeta(), command.positionType(), command.quantity());
    }

    @Override
    public GetMeResult me(String gameId, String playerId) {
        Player player = getPlayer(gameId, playerId);
        List<PositionInfo> positionInfos= player.getPositions().stream()
                .map(PositionInfo::from).toList();
        return new GetMeResult(PlayerInfo.from(player), positionInfos);
    }

    @Override
    public void earnByClick(String gameId, String playerId) {
        Player player = getPlayer(gameId, playerId);
        player.earn(CLICK_REWARD);
    }

    private Game getGame(String gameId) {
        Room room = roomRepository.findById(gameId).orElseThrow(()-> new GameException(ROOM_NOT_FOUND));
        room.finishIfEnded(clock.instant());
        if(room.getStatus() != RoomStatus.RUNNING) throw new GameException(GAME_NOT_RUNNING);
        return room.getGame();
    }

    private Player getPlayer(String gameId, String playerId){
        return playerRepository.findByRoomIdAndPlayerId(gameId, playerId)
                .orElseThrow(() -> new GameException(PLAYER_NOT_FOUND));
    }
}
