package com.antswar.backend.player.api;

import com.antswar.backend.player.api.dto.RegisterPlayerRequest;
import com.antswar.backend.player.application.dto.RegisterPlayerResult;
import com.antswar.backend.player.application.port.in.RegisterPlayer;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/player")
public class PlayerController {
    private final RegisterPlayer registerPlayer;

    @PostMapping
    public ResponseEntity<Void> register(@RequestBody @Valid RegisterPlayerRequest request,
                                         HttpServletResponse response) {
        RegisterPlayerResult result = registerPlayer.register(request.name());
        addGuestCookie(response, result.id());

        return ResponseEntity.noContent().build();
    }

    private void addGuestCookie(HttpServletResponse response, String playerId) {
        Cookie cookie = new Cookie("PLAYER_ID", playerId);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(60 * 60 * 24 * 365);   //1년
        cookie.setSecure(true);
        response.addCookie(cookie);
    }
}
