package com.antswar.backend.game.api.request;

import com.antswar.backend.game.application.port.in.room.request.RegisterRoomCommand;
import com.antswar.backend.game.domain.room.RoomMode;
import com.antswar.backend.game.domain.room.RoomModeType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegisterGameRequest(
        @NotBlank @Size(max = 20) String name
        , String playerName
        , String password
        , int capacity
        , @NotNull GameModeRequest mode){
    public record GameModeRequest(
            @NotNull RoomModeType type,
            @NotNull Integer target
    ) {}

    public RegisterRoomCommand toCommand(String playerId){
        return new RegisterRoomCommand(this.name, this.password, playerId, this.playerName, new RoomMode(this.mode.type, this.mode.target),capacity);
    }
}