package com.antswar.backend.game.application.port.out;

import com.antswar.backend.game.domain.purchase.PriceHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface PriceHistoryRepository extends JpaRepository<PriceHistory, Long> {
    @Query("SELECT ph FROM PriceHistory ph WHERE ph.purchase.id IN :purchaseIds AND ph.recordedAt >= :since ORDER BY ph.purchase.id, ph.recordedAt")
    List<PriceHistory> findSince(@Param("purchaseIds") List<Long> purchaseIds, @Param("since") LocalDateTime since);
}
