package com.antswar.backend.game.domain.game;

public record GameMode(GameModeType type, int target) {

    public GameMode {
        if (type == GameModeType.TIME && !(target == 5 || target == 10 || target == 30 || target == 60)) {
            throw new IllegalArgumentException("잘못된 시간 모드 값");
        }

        if (type == GameModeType.MONEY && !(target == 100 || target == 1000 || target == 10000)) {
            throw new IllegalArgumentException("잘못된 금액 모드 값");
        }
    }
}