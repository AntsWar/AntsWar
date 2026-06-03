package com.antswar.backend.game.application;

import com.antswar.backend.game.application.dto.ChatInfo;
import com.antswar.backend.game.application.port.out.ChatPublisher;
import com.antswar.backend.game.application.port.out.ChatRepository;
import com.antswar.backend.game.domain.chat.Chat;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ChatService {
    private final ChatRepository chatRepository;
    private final ChatPublisher chatPublisher;

    @Transactional
    public void publish(long gameId, long playerId, String playerName, String content){
        Chat chat = chatRepository.save(new Chat(gameId, playerId, content));

        chatPublisher.publish(gameId, new ChatInfo(playerName, chat.getContent()));
    }
}
