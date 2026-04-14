package com.antswar.backend.room.domain;

import com.antswar.backend.common.jpa.SoftDeleteEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

import static org.springframework.util.StringUtils.hasText;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Room extends SoftDeleteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    private String publicId;

    @Getter
    private String name;

    @Column(nullable = false)
    private String password;

    @Getter
    @Enumerated(EnumType.STRING)
    private RoomStatus status;

    @Getter
    private String hostId;

    @Getter
    private int capacity;

    @Enumerated(EnumType.STRING)
    private RoomModeType type;
    private int target;

    private Room(String name, String password, String hostId, RoomModeType type, int target, int capacity){
        this.publicId = UUID.randomUUID().toString();
        this.name = name;
        this.password = password;
        this.status = RoomStatus.READY;
        this.hostId = hostId;
        this.type = type;
        this.target = target;
        this.capacity = capacity;
    }

    public boolean hasPassword(){
        return hasText(password);
    }

    public RoomMode getRoomMode(){
        return new RoomMode(type, target);
    }

    public static Room of(String name, String password, String hostId, RoomMode mode, int capacity){
        validateName(name);
        validatePassword(password);
        validateCapacity(capacity);
        return new Room(name, password, hostId, mode.type(), mode.target(), capacity);
    }

    private static void validateCapacity(int capacity){
        if(capacity > 10){
            throw new IllegalArgumentException("방 인원은 최대 10명 입니다.");
        }
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
