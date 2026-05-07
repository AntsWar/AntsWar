package com.antswar.backend.game.api;

import com.antswar.backend.game.api.request.ChatRequest;
import com.antswar.backend.game.application.ChatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.Objects;

@Controller
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;

    @MessageMapping("/game/{gameId}/chat")
    public void chat(
            @DestinationVariable Long gameId,
            @Payload @Valid ChatRequest request,
            SimpMessageHeaderAccessor accessor
    ) {
        Long playerId = (Long) Objects.requireNonNull(accessor.getSessionAttributes()).get("playerId");
        String playerName = (String) accessor.getSessionAttributes().get("playerName");

        if (playerId == null) {
            throw new IllegalStateException("playerId가 없습니다.");
        }

        chatService.publish(gameId, playerId, playerName, request.content());
    }
}
