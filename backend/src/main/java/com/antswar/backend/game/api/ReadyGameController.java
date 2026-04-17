package com.antswar.backend.game.api;

import com.antswar.backend.common.annotation.Auth;
import com.antswar.backend.game.api.dto.JoinGameRequest;
import com.antswar.backend.game.api.dto.RegisterGameRequest;
import com.antswar.backend.game.application.dto.request.readyGame.JoinGameCommand;
import com.antswar.backend.game.application.dto.request.readyGame.SearchGameQuery;
import com.antswar.backend.game.application.dto.response.readyGame.RegisterGameResult;
import com.antswar.backend.game.application.dto.response.GameInfo;
import com.antswar.backend.game.application.port.in.readyGame.JoinGame;
import com.antswar.backend.game.application.port.in.readyGame.RegisterGame;
import com.antswar.backend.game.application.port.in.readyGame.SearchReadyGame;
import com.antswar.backend.game.application.port.in.readyGame.StartGame;
import com.antswar.backend.game.infrastructure.resolver.PlayerPrincipal;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/room")
@RestController
@RequiredArgsConstructor
public class ReadyGameController {
    private final RegisterGame registerGame;
    private final SearchReadyGame searchReadyGame;
    private final JoinGame joinGame;
    private final StartGame startGame;

    @PostMapping
    public ResponseEntity<RegisterGameResult> register(@RequestBody @Valid RegisterGameRequest request,
                                                       @Auth PlayerPrincipal player){
        RegisterGameResult result = registerGame.register(request.toCommand(player.id(), player.name()));
        return ResponseEntity.ok(result);
    }

    @GetMapping("/search")
    public ResponseEntity<List<GameInfo>> search(@RequestParam(value = "name", required = false) String name){
        List<GameInfo> gameInfos = searchReadyGame.search(new SearchGameQuery(name));
        return ResponseEntity.ok(gameInfos);
    }

    @PostMapping("{gameId}/join")
    public ResponseEntity<Void> join(@PathVariable @NotBlank String gameId,
                                     @RequestBody @Valid JoinGameRequest request,
                                     @Auth PlayerPrincipal player){
        joinGame.join(new JoinGameCommand(gameId, request.password(), player.id(), player.name()));
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{gameId}/start")
    public ResponseEntity<Void> start(@PathVariable @NotBlank String gameId,
                                      @Auth PlayerPrincipal player){
        startGame.start(gameId, player.id());
        return ResponseEntity.noContent().build();
    }

}
