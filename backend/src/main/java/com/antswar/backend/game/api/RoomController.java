package com.antswar.backend.game.api;

import com.antswar.backend.common.annotation.Auth;
import com.antswar.backend.game.api.request.JoinGameRequest;
import com.antswar.backend.game.api.request.RegisterGameRequest;
import com.antswar.backend.game.application.dto.GameInfo;
import com.antswar.backend.game.application.dto.RoomInfo;
import com.antswar.backend.game.application.port.in.room.*;
import com.antswar.backend.game.application.port.in.room.request.JoinRoomCommand;
import com.antswar.backend.game.application.port.in.room.response.JoinRoomResult;
import com.antswar.backend.game.application.port.in.room.response.RegisterRoomResult;
import com.antswar.backend.game.application.port.in.room.ReadyGame;
import com.antswar.backend.game.application.port.out.RoomEventPublisher;
import com.antswar.backend.game.application.port.out.request.RoomEvent;
import com.antswar.backend.game.application.port.out.request.RoomEventType;
import com.antswar.backend.game.infrastructure.resolver.PlayerPrincipal;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/room")
@RestController
@RequiredArgsConstructor
public class RoomController {
    private final RegisterRoom registerRoom;
    private final SearchRoom searchRoom;
    private final JoinRoom joinRoom;
    private final ReadyGame readyGame;
    private final RoomEventPublisher roomEventPublisher;

    @PostMapping
    public ResponseEntity<RegisterRoomResult> register(@RequestBody @Valid RegisterGameRequest request,
                                                       @Auth PlayerPrincipal player){
        RegisterRoomResult result = registerRoom.register(request.toCommand(player.id()));
        return ResponseEntity.ok(result);
    }

    @GetMapping("/search")
    public ResponseEntity<List<RoomInfo>> search(@RequestParam(value = "name", required = false) String name){
        List<RoomInfo> gameInfos = searchRoom.search(name);
        return ResponseEntity.ok(gameInfos);
    }

    @PostMapping("/{roomId}/join")
    public ResponseEntity<JoinRoomResult> join(@PathVariable @NotBlank String roomId,
                                               @RequestBody @Valid JoinGameRequest request,
                                               @Auth PlayerPrincipal player){
        JoinRoomResult result = joinRoom.join(new JoinRoomCommand(roomId, request.password(), player.id(), request.playerName()));

        roomEventPublisher.publish(roomId, new RoomEvent(RoomEventType.ROOM_UPDATED, result.game()));
        return ResponseEntity.ok(result);
    }

    @PostMapping("/{roomId}/start")
    public ResponseEntity<Void> start(@PathVariable @NotBlank String roomId,
                                      @Auth PlayerPrincipal player){
        readyGame.ready(roomId, player.id());
        roomEventPublisher.publish(roomId, new RoomEvent(RoomEventType.GAME_READY, null));
        return ResponseEntity.noContent().build();
    }

}
