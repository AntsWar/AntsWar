package com.antswar.backend.game.application.port.out;

import com.antswar.backend.game.domain.chat.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat,Long> {
}
