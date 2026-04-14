package com.antswar.backend.player.api.dto;

import jakarta.validation.constraints.NotBlank;

public record RegisterPlayerRequest(@NotBlank String name) {
}
