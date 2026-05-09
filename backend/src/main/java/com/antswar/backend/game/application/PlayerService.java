package com.antswar.backend.game.application;

import com.antswar.backend.game.application.port.in.BuyItem;
import com.antswar.backend.game.application.port.in.BuyItemFakeNews;
import com.antswar.backend.game.application.port.out.GameEventPublisher;
import com.antswar.backend.game.application.port.out.PlayerRepository;
import com.antswar.backend.game.application.port.out.request.GameEvent;
import com.antswar.backend.game.application.port.out.request.GameEventType;
import com.antswar.backend.game.domain.news.NewsMeta;
import com.antswar.backend.game.domain.player.Item;
import com.antswar.backend.game.domain.player.Player;
import com.antswar.backend.game.exception.GameException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.antswar.backend.game.exception.GameErrorCode.PLAYER_NOT_FOUND;

@RequiredArgsConstructor
@Service
public class PlayerService implements BuyItem, BuyItemFakeNews {
    private final PlayerRepository playerRepository;
    private final GameEventPublisher gameEventPublisher;

    @Override
    @Transactional
    public void buy(long playerId, Item item) {
        Player player = getPlayer(playerId);
        player.buy(item);
    }

    @Override
    @Transactional
    public void buy(long playerId, String code) {
        Player player = getPlayer(playerId);
        NewsMeta newsMeta = NewsMeta.from(code);

        player.buy(Item.FAKE_NEWS);
        gameEventPublisher.publish(player.getGame().getId(),
                new GameEvent(GameEventType.NOTICE, newsMeta.getCode())
        );
    }

    private Player getPlayer(long id){
        return playerRepository.findById(id).orElseThrow(() -> new GameException(PLAYER_NOT_FOUND));
    }

}
