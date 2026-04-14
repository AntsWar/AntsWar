package com.antswar.backend.player.application.port.in;

import com.antswar.backend.player.application.dto.RegisterPlayerResult;

public interface RegisterPlayer {
    RegisterPlayerResult register(String name);
}
