package com.antswar.backend.game.domain.game;

public enum GameStatus {
    READY,     // 게임 생성됨, 아직 시작 안됨
    RUNNING,   // 진행 중
    FINISHED   // 종료됨
}