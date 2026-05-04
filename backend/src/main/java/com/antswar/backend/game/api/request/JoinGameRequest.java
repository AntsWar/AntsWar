package com.antswar.backend.game.api.request;

import jakarta.validation.constraints.NotBlank;

public record JoinGameRequest(@NotBlank String playerName) { }
