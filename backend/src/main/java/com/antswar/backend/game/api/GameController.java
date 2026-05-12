package com.antswar.backend.game.api;

import com.antswar.backend.common.annotation.Auth;
import com.antswar.backend.game.api.request.JoinGameRequest;
import com.antswar.backend.game.api.request.PurchaseRequest;
import com.antswar.backend.game.application.port.in.EarnByClick;
import com.antswar.backend.game.application.port.in.GetMe;
import com.antswar.backend.game.application.port.in.JoinGame;
import com.antswar.backend.game.application.port.in.Trade;
import com.antswar.backend.game.application.port.in.request.TradeCommand;
import com.antswar.backend.game.application.port.in.response.GetMeResult;
import com.antswar.backend.game.application.port.in.request.JoinGameCommand;
import com.antswar.backend.game.application.port.in.response.JoinGameResult;
import com.antswar.backend.game.infrastructure.resolver.PlayerPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Duration;


@RequestMapping("/game")
@RestController
@RequiredArgsConstructor
public class GameController {
    private final Trade trade;
    private final GetMe getMe;
    private final JoinGame joinGame;
    private final EarnByClick earnByClick;

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

    @PostMapping("/earn/click")
    public ResponseEntity<Void> earnByClick(@Auth PlayerPrincipal player){
        earnByClick.earnByClick(player.id());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/join")
    public ResponseEntity<JoinGameResult> join(@RequestBody @Valid JoinGameRequest request) {
        JoinGameResult result =
                joinGame.join(new JoinGameCommand(request.playerName()));

        ResponseCookie playerIdCookie = ResponseCookie.from("playerId", String.valueOf(result.player().id()))
                        .httpOnly(true)
                        .path("/")
                        .maxAge(Duration.ofHours(2))
                        .build();

        ResponseCookie playerNameCookie = ResponseCookie.from("playerName",
                        URLEncoder.encode(result.player().name(), StandardCharsets.UTF_8))
                        .path("/")
                        .maxAge(Duration.ofDays(30))
                        .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, playerIdCookie.toString())
                .header(HttpHeaders.SET_COOKIE, playerNameCookie.toString())
                .body(result);
    }
}
