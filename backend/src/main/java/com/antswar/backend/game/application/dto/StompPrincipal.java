package com.antswar.backend.game.application.dto;

import java.security.Principal;

public record StompPrincipal(long playerId, String playerName) implements Principal {
    @Override
    public String getName() {
        return String.valueOf(playerId);
    }
}
