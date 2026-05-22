package com.antswar.backend.game.api;

import com.antswar.backend.game.api.request.JoinGameRequest;
import com.antswar.backend.game.application.port.in.JoinGame;
import com.antswar.backend.game.application.port.in.request.JoinGameCommand;
import com.antswar.backend.game.application.port.in.response.JoinGameResult;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/game")
@RestController
@RequiredArgsConstructor
public class GameController {
    private final JoinGame joinGame;

    @PostMapping("/join")
    public ResponseEntity<JoinGameResult> join(@RequestBody @Valid JoinGameRequest request,
                                               HttpSession session) {
        JoinGameResult result = joinGame.join(new JoinGameCommand(request.playerName()));

        session.setAttribute("playerId", result.player().id());
        session.setAttribute("playerName", result.player().name());

        return ResponseEntity.ok(result);
    }
}
