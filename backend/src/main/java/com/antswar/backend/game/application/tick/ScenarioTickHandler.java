package com.antswar.backend.game.application.tick;

import com.antswar.backend.game.application.ScenarioManager;
import com.antswar.backend.game.domain.Game;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Component
public class ScenarioTickHandler implements TickHandler {
    private final ScenarioManager scenarioManager;

    @Override
    public void handle(Game game, LocalDateTime now) {
        scenarioManager.tick();
    }
}
