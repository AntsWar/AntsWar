package com.antswar.backend.game.api;

import com.antswar.backend.common.annotation.Auth;
import com.antswar.backend.game.api.request.BuyItemRequest;
import com.antswar.backend.game.api.request.PurchaseRequest;
import com.antswar.backend.game.application.port.in.BuyItem;
import com.antswar.backend.game.application.port.in.GetMe;
import com.antswar.backend.game.application.port.in.Trade;
import com.antswar.backend.game.application.port.in.request.TradeCommand;
import com.antswar.backend.game.application.port.in.response.GetMeResult;
import com.antswar.backend.game.infrastructure.resolver.PlayerPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/player")
@RestController
@RequiredArgsConstructor
public class PlayerController {
    private final Trade trade;
    private final GetMe getMe;
    private final BuyItem buyItem;

    @PostMapping("/order")
    public ResponseEntity<Void> trade(@RequestBody @Valid PurchaseRequest request,
                                      @Auth PlayerPrincipal player){
        trade.trade(new TradeCommand(player.id(), request.orderType(), request.positionType(), request.purchaseId(), request.quantity()));
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    public ResponseEntity<GetMeResult> getMe(@Auth PlayerPrincipal player){
        GetMeResult result = getMe.me(player.id());
        return ResponseEntity.ok(result);
    }

    @PostMapping("/item")
    public ResponseEntity<Void> buyItem(@Auth PlayerPrincipal player,
                                        @RequestBody @Valid BuyItemRequest request){
        buyItem.buy(player.id(), request.item(), request.code());
        return ResponseEntity.noContent().build();
    }
}
