package com.antswar.backend.room.api.dto;

import com.antswar.backend.room.application.dto.RegisterRoomCommand;
import com.antswar.backend.room.domain.RoomMode;
import com.antswar.backend.room.domain.RoomModeType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegisterRoomRequest (
        @NotBlank @Size(max = 20) String name
        , String password
        ,@NotNull RoomModeRequest roomMode){
    public record RoomModeRequest(
            @NotNull RoomModeType roomModeType,
            @NotNull Integer target
    ) {}

    public RegisterRoomCommand toCommand(String hostId){
        return new RegisterRoomCommand(this.name, this.password,hostId, RoomMode.of(roomMode.roomModeType, roomMode.target));
    }
}