package com.antswar.backend.game.domain.room;

public enum RoomStatus {
    WAITING,   // 게임 없음
    READY,     // 게임 생성됨, 아직 시작 안됨
    RUNNING,   // 진행 중
    FINISHED   // 종료됨
}