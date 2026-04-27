package com.antswar.backend.game.api;

import com.antswar.backend.common.annotation.Auth;
import com.antswar.backend.game.api.request.PurchaseRequest;
import com.antswar.backend.game.application.port.in.game.request.OrderCommand;
import com.antswar.backend.game.application.port.in.game.response.GetMeResult;
import com.antswar.backend.game.application.port.in.game.*;
import com.antswar.backend.game.infrastructure.resolver.PlayerPrincipal;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RequestMapping("/game")
@RestController
@RequiredArgsConstructor
public class GameController {
    private final Trade trade;
    private final GetMe getMe;
    private final EarnByClick earnByClick;

    @PostMapping("/{gameId}/order")
    public ResponseEntity<Void> trade(@PathVariable @NotBlank String gameId,
                                                 @RequestBody @Valid PurchaseRequest request,
                                                 @Auth PlayerPrincipal player){
        trade.order(new OrderCommand(gameId, player.id(), request.orderType(), request.positionType(), request.meta(), request.quantity()));
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{gameId}/me")
    public ResponseEntity<GetMeResult> getMe(@PathVariable @NotBlank String gameId,
                                             @Auth PlayerPrincipal player){
        GetMeResult result = getMe.me(gameId, player.id());
        return ResponseEntity.ok(result);
    }

    @PostMapping("/{gameId}/earn/click")
    public ResponseEntity<Void> earnByClick(@PathVariable @NotBlank String gameId,
                                            @Auth PlayerPrincipal player){
        earnByClick.earnByClick(gameId, player.id());
        return ResponseEntity.noContent().build();
    }
}
