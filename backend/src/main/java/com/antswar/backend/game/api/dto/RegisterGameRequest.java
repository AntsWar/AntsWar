package com.antswar.backend.game.api.dto;

import com.antswar.backend.game.application.dto.request.readyGame.RegisterGameCommand;
import com.antswar.backend.game.domain.game.GameMode;
import com.antswar.backend.game.domain.game.GameModeType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegisterGameRequest(
        @NotBlank @Size(max = 20) String name
        , String password
        , int capacity
        , @NotNull GameModeRequest gameMode){
    public record GameModeRequest(
            @NotNull GameModeType gameModeType,
            @NotNull Integer target
    ) {}

    public RegisterGameCommand toCommand(String hostId){
        return new RegisterGameCommand(this.name, this.password, hostId, new GameMode(this.gameMode.gameModeType, this.gameMode.target),capacity);
    }
}