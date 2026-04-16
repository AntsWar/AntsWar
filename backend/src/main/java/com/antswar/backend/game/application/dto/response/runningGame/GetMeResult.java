package com.antswar.backend.game.application.dto.response.runningGame;

import com.antswar.backend.game.application.dto.response.PlayerInfo;
import com.antswar.backend.game.application.dto.response.PositionInfo;

import java.util.List;

public record GetMeResult(PlayerInfo player, List<PositionInfo> positions) {
}
