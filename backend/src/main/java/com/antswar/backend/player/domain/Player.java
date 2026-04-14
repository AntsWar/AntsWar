package com.antswar.backend.player.domain;

import com.antswar.backend.common.jpa.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Player extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String publicId;
    private String name;

    private Player(String name){
        this.publicId = UUID.randomUUID().toString();
        this.name = name;
    }

    public static Player from(String name){
        validateName(name);
        return new Player(name);
    }

    private static void validateName(String name) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("이름은 비어 있을 수 없습니다.");
        }
        if (name.length() > 10) {
            throw new IllegalArgumentException("이름은 10자 이하여야 합니다.");
        }
    }
}
