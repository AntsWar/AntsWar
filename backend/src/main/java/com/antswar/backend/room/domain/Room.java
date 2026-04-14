package com.antswar.backend.room.domain;

import com.antswar.backend.common.jpa.SoftDeleteEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Room extends SoftDeleteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String publicId;
    private String name;
    private String password;
    private RoomStatus status;
    private String hostId;
    private RoomModeType type;
    private int target;

    private Room(String name, String password, String hostId, RoomModeType type, int target){
        this.publicId = UUID.randomUUID().toString();
        this.name = name;
        this.password = password;
        this.status = RoomStatus.READY;
        this.hostId = hostId;
        this.type = type;
        this.target = target;
    }

    public static Room of(String name, String password, String hostId, RoomMode mode){
        validateName(name);
        validatePassword(password);
        return new Room(name, password, hostId, mode.type(), mode.target());
    }

    private static void validatePassword(String password) {
        if (password.length() > 10) {
            throw new IllegalArgumentException("방 이름은 10자 이하여야 합니다.");
        }
    }

    private static void validateName(String name) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("방 이름은 비어 있을 수 없습니다.");
        }
        if (name.length() > 20) {
            throw new IllegalArgumentException("방 이름은 20자 이하여야 합니다.");
        }
    }
}
