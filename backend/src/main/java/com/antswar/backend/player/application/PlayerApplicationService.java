package com.antswar.backend.player.application;

import com.antswar.backend.player.application.dto.RegisterPlayerResult;
import com.antswar.backend.player.application.port.in.RegisterPlayer;
import com.antswar.backend.player.application.port.out.PlayerRepository;
import com.antswar.backend.player.domain.Player;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PlayerApplicationService implements RegisterPlayer {
    private final PlayerRepository repository;

    @Override
    public RegisterPlayerResult register(String name) {
        Player player = repository.save(Player.from(name));
        return new RegisterPlayerResult(player.getPublicId());
    }
}
