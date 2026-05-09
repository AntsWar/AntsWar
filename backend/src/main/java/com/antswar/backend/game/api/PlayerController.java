package com.antswar.backend.game.api;

import com.antswar.backend.common.annotation.Auth;
import com.antswar.backend.game.api.request.BuyItemRequest;
import com.antswar.backend.game.application.port.in.BuyItem;
import com.antswar.backend.game.infrastructure.resolver.PlayerPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/player")
@RestController
@RequiredArgsConstructor
public class PlayerController {
    private final BuyItem buyItem;

    @PostMapping("/item")
    public ResponseEntity<Void> buyItem(@Auth PlayerPrincipal player,
                                        @RequestBody @Valid BuyItemRequest request){
        buyItem.buy(player.id(), request.item());
        return ResponseEntity.noContent().build();
    }
}
