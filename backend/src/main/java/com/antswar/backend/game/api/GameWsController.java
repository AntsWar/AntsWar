package com.antswar.backend.game.api;


import com.antswar.backend.game.api.request.BindRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class GameWsController {

    @MessageMapping("/room/{roomId}/bind")
    public void bind(@DestinationVariable String roomId, BindRequest request, SimpMessageHeaderAccessor accessor) {
        Map<String, Object> attrs = accessor.getSessionAttributes();
        if (attrs == null) {
            attrs = new HashMap<>();
            accessor.setSessionAttributes(attrs);
        }

        attrs.put("playerId", request.playerId());
        attrs.put("roomId", roomId);
    }
}
