package com.antswar.backend.game.application.port.in.response;

import com.antswar.backend.game.application.dto.GameInfo;
import com.antswar.backend.game.application.dto.PlayerInfo;

public record JoinGameResult(GameInfo game, PlayerInfo player) {
}
