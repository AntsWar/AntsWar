package com.antswar.backend.game.application.dto.response.runningGame;

import com.antswar.backend.game.application.dto.response.PlayerInfo;
import com.antswar.backend.game.application.dto.response.PurchaseInfo;

import java.util.List;

public record GetGameResult(List<PlayerInfo> players, List<PurchaseInfo> purchases, boolean isHost){
}
