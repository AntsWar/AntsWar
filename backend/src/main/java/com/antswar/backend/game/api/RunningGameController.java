package com.antswar.backend.game.api;

import com.antswar.backend.common.annotation.Auth;
import com.antswar.backend.game.api.dto.PurchaseRequest;
import com.antswar.backend.game.application.dto.request.runningGame.PurchaseCommand;
import com.antswar.backend.game.application.dto.request.runningGame.GetGameQuery;
import com.antswar.backend.game.application.dto.response.runningGame.GetGameResult;
import com.antswar.backend.game.application.dto.response.runningGame.GetMeResult;
import com.antswar.backend.game.application.port.in.readyGame.StartGame;
import com.antswar.backend.game.application.port.in.runningGame.*;
import com.antswar.backend.game.infrastructure.resolver.PlayerPrincipal;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RequestMapping("/game")
@RestController
@RequiredArgsConstructor
public class RunningGameController {
    private final GetGame getGame;
    private final BuyPurchase buyPurchase;
    private final SellPurchase sellPurchase;
    private final GetMe getMe;

    @GetMapping("/{gameId}")
    public ResponseEntity<GetGameResult> getGame(@PathVariable @NotBlank String gameId,
                                                       @Auth PlayerPrincipal player){
        GetGameResult result = getGame.get(new GetGameQuery(gameId, player.id()));
        return ResponseEntity.ok(result);
    }

    @PostMapping("/{gameId}/buy")
    public ResponseEntity<Void> buyPurchase(@PathVariable @NotBlank String gameId,
                                                 @RequestBody @Valid PurchaseRequest request,
                                                 @Auth PlayerPrincipal player){
         buyPurchase.buy(new PurchaseCommand(gameId, player.id(), request.purchaseId(), request.quantity()));
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{gameId}/sell")
    public ResponseEntity<GetGameResult> sellPurchase(@PathVariable @NotBlank String gameId,
                                                     @RequestBody @Valid PurchaseRequest request,
                                                     @Auth PlayerPrincipal player){
        sellPurchase.sell(new PurchaseCommand(gameId, player.id(), request.purchaseId(), request.quantity()));
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{gameId}/me")
    public ResponseEntity<GetMeResult> getMe(@PathVariable @NotBlank String gameId,
                                             @Auth PlayerPrincipal player){
        GetMeResult result = getMe.me(gameId, player.id());
        return ResponseEntity.ok(result);
    }

}
