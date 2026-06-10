package com.antswar.backend.game.application;

import com.antswar.backend.game.application.dto.ChatInfo;
import com.antswar.backend.game.application.dto.GameEvent;
import com.antswar.backend.game.application.dto.PlayerEvent;
import com.antswar.backend.game.application.port.out.ChatPublisher;
import com.antswar.backend.game.application.port.out.GamePublisher;
import com.antswar.backend.game.application.port.out.PlayerPublisher;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class EventPublisher {
    private final PlayerPublisher playerPublisher;
    private final GamePublisher gamePublisher;
    private final ChatPublisher chatPublisher;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handle(ChatInfo event) {
        chatPublisher.publish(event);
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handle(GameEvent event) {
        gamePublisher.publish(event.type(), event.payload());
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handle(PlayerEvent event) {
        playerPublisher.publish(event);
    }
}
