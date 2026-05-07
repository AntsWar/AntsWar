package com.antswar.backend.game.domain.chat;

import com.antswar.backend.common.jpa.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static org.springframework.util.Assert.hasText;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Chat extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private long gameId;
    private long playerId;

    @Getter
    @Column(nullable = false, length = 100)
    private String content;

    public Chat(long gameId, long playerId, String content){
        hasText(content, "내용이 빔");
        this.gameId = gameId;
        this.playerId = playerId;
        this.content = content;
    }
}