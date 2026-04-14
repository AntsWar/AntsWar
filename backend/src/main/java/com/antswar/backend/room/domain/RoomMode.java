package com.antswar.backend.room.domain;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Embeddable
public class RoomMode {
    @Enumerated(EnumType.STRING)
    private RoomModeType type;
    private int target;

    private RoomMode(RoomModeType type, int target) {
        this.type = type;
        this.target = target;
    }

    public static RoomMode of(RoomModeType type, int target){
        validate(type, target);
        return new RoomMode(type, target);
    }

    private static void validate(RoomModeType type, int target) {
        if (type == RoomModeType.TIME && !(target == 5 || target == 10 || target == 30 || target == 60)) {
            throw new IllegalArgumentException("잘못된 시간 모드 값");
        }

        if (type == RoomModeType.MONEY && !(target == 100 || target == 1000 || target == 10000)) {
            throw new IllegalArgumentException("잘못된 금액 모드 값");
        }
    }
}