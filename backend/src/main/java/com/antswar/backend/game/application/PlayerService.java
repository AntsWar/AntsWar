package com.antswar.backend.game.application;

import com.antswar.backend.game.application.port.in.BuyItem;
import com.antswar.backend.game.application.port.out.PlayerRepository;
import com.antswar.backend.game.domain.player.Item;
import com.antswar.backend.game.domain.player.Player;
import com.antswar.backend.game.exception.GameException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.antswar.backend.game.exception.GameErrorCode.PLAYER_NOT_FOUND;

@RequiredArgsConstructor
@Service
public class PlayerService implements BuyItem {
    private final PlayerRepository playerRepository;

    @Override
    @Transactional
    public void buy(long playerId, Item item) {
        Player player = getPlayer(playerId);
        player.buy(item);
    }

    private Player getPlayer(long id){
        return playerRepository.findById(id).orElseThrow(() -> new GameException(PLAYER_NOT_FOUND));
    }
}
