package com.antswar.backend.game.api;

import com.antswar.backend.common.annotation.Auth;
import com.antswar.backend.game.api.request.BuyItemFakeNewsRequest;
import com.antswar.backend.game.api.request.BuyItemRequest;
import com.antswar.backend.game.application.port.in.BuyItem;
import com.antswar.backend.game.application.port.in.BuyItemFakeNews;
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
    private final BuyItemFakeNews buyItemFakeNews;

    @PostMapping("/item")
    public ResponseEntity<Void> buyItem(@Auth PlayerPrincipal player,
                                        @RequestBody @Valid BuyItemRequest request){
        buyItem.buy(player.id(), request.item());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/item/fake-news")
    public ResponseEntity<Void> publishFakeNews(@Auth PlayerPrincipal player,
                                                @RequestBody @Valid BuyItemFakeNewsRequest request) {
        buyItemFakeNews.buy(player.id(), request.code());
        return ResponseEntity.noContent().build();
    }
}
