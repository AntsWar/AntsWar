package com.antswar.backend.game.application.port.in.response;

import com.antswar.backend.game.application.dto.PlayerInfo;
import com.antswar.backend.game.application.dto.PositionInfo;

import java.util.List;

public record GetMeResult(PlayerInfo player, List<PositionInfo> positions, double noticeRate) {
}
