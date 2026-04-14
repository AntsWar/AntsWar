package com.antswar.backend.room.api;

import com.antswar.backend.common.annotation.CurrentPlayer;
import com.antswar.backend.room.api.dto.RegisterRoomRequest;
import com.antswar.backend.room.application.dto.RegisterRoomResult;
import com.antswar.backend.room.application.port.in.RegisterRoom;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RoomController {
    private final RegisterRoom registerRoom;

    @PostMapping("/room")
    public ResponseEntity<RegisterRoomResult> register(@RequestBody @Valid RegisterRoomRequest request,
                                                           @CurrentPlayer String playerId){
        RegisterRoomResult result = registerRoom.register(request.toCommand(playerId));
        return ResponseEntity.ok(result);
    }
}
