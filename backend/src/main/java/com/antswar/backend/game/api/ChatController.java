package com.antswar.backend.game.api;

import com.antswar.backend.game.api.request.ChatRequest;
import com.antswar.backend.game.application.ChatService;
import com.antswar.backend.game.application.dto.StompPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;

import java.security.Principal;
import java.util.Objects;

@Controller
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;

    @MessageMapping("/chat/{gameId}")
    public void chat(@DestinationVariable long gameId,
                     @Payload @Valid ChatRequest request,
                     Principal principal) {
        StompPrincipal stompPrincipal = (StompPrincipal) principal;

        long playerId = stompPrincipal.playerId();
        String playerName = stompPrincipal.playerName();

        chatService.publish(gameId, playerId, playerName, request.content());
    }
}
