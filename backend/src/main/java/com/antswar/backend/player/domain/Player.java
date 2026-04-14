package com.antswar.backend.player.domain;

import java.util.UUID;

import static org.springframework.util.StringUtils.hasText;

public record Player(String id, String name) {

    public Player {
        validateId(id);
        validateName(name);
    }

    public static Player from(String name) {
        return new Player(UUID.randomUUID().toString(), name);
    }

    private static void validateId(String id){
        if(!hasText(id)) throw new IllegalArgumentException("아이디가 비어 있을 수 없습니다.");
    }

    private static void validateName(String name) {
        if (!hasText(name)) throw new IllegalArgumentException("이름은 비어 있을 수 없습니다.");
        if (name.length() > 10) throw new IllegalArgumentException("이름은 10자 이하여야 합니다.");
    }
}