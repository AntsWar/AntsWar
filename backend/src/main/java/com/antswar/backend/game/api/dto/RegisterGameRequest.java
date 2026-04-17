package com.antswar.backend.game.api.dto;

import com.antswar.backend.game.application.dto.request.readyGame.RegisterGameCommand;
import com.antswar.backend.game.domain.game.GameMode;
import com.antswar.backend.game.domain.game.GameModeType;
import com.antswar.backend.game.domain.player.Player;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegisterGameRequest(
        @NotBlank @Size(max = 20) String name
        , String password
        , int capacity
        , @NotNull GameModeRequest mode){
    public record GameModeRequest(
            @NotNull GameModeType type,
            @NotNull Integer target
    ) {}

    public RegisterGameCommand toCommand(String hostId, String hostName){
        return new RegisterGameCommand(this.name, this.password, new Player(hostId, hostName), new GameMode(this.mode.type, this.mode.target),capacity);
    }
}