package com.antswar.backend.game.api;

import com.antswar.backend.common.annotation.Auth;
import com.antswar.backend.game.api.request.BuyItemRequest;
import com.antswar.backend.game.api.request.BuyPurchaseRequest;
import com.antswar.backend.game.api.request.SellPurchaseRequest;
import com.antswar.backend.game.application.port.in.BuyItem;
import com.antswar.backend.game.application.port.in.GetMe;
import com.antswar.backend.game.application.port.in.PurchaseTrade;
import com.antswar.backend.game.application.port.in.request.BuyPurchaseCommand;
import com.antswar.backend.game.application.port.in.request.SellPurchaseCommand;
import com.antswar.backend.game.application.port.in.response.BuyRumorResult;
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
    private final PurchaseTrade purchaseTrade;
    private final GetMe getMe;
    private final BuyItem buyItem;

    @PostMapping("/purchase/buy")
    public ResponseEntity<Void> buyPurchase(@RequestBody @Valid BuyPurchaseRequest request,
                                      @Auth PlayerPrincipal player){
        purchaseTrade.buy(new BuyPurchaseCommand(player.id(), request.positionType(), request.purchaseId(), request.quantity()));
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/purchase/sell")
    public ResponseEntity<Void> sellPurchase(@RequestBody @Valid SellPurchaseRequest request,
                                            @Auth PlayerPrincipal player){
        purchaseTrade.sell(new SellPurchaseCommand(player.id(), request.positionId(), request.quantity()));
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    public ResponseEntity<GetMeResult> getMe(@Auth PlayerPrincipal player){
        GetMeResult result = getMe.me(player.id());
        return ResponseEntity.ok(result);
    }

    @PostMapping("/item")
    public ResponseEntity<Void> buyItem(@RequestBody @Valid BuyItemRequest request,
                                          @Auth PlayerPrincipal player){
        buyItem.buyItem(player.id(), request.item());
        return ResponseEntity.noContent().build();
    }


    @PostMapping("/item/rumor")
    public ResponseEntity<BuyRumorResult> buyRumor(@RequestBody @Valid BuyItemRequest request,
                                                   @Auth PlayerPrincipal player){
        BuyRumorResult result = buyItem.buyRumor(player.id(), request.item(), request.category());
        return ResponseEntity.ok(result);
    }
}
