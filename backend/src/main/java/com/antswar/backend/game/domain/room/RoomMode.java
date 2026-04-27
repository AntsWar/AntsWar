package com.antswar.backend.game.domain.room;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@EqualsAndHashCode
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomMode {
    @Enumerated(EnumType.STRING)
    private RoomModeType type;
    private int target;

    public RoomMode(RoomModeType type, int target){
        if(target <= 0) throw new IllegalArgumentException("잘못된 목표 값");
        this.type = type;
        this.target = target;
    }
}