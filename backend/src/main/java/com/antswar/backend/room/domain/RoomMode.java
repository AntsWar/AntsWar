package com.antswar.backend.room.domain;

public record RoomMode(RoomModeType type, int target) {

    public RoomMode {
        if (type == RoomModeType.TIME && !(target == 5 || target == 10 || target == 30 || target == 60)) {
            throw new IllegalArgumentException("잘못된 시간 모드 값");
        }

        if (type == RoomModeType.MONEY && !(target == 100 || target == 1000 || target == 10000)) {
            throw new IllegalArgumentException("잘못된 금액 모드 값");
        }
    }
}