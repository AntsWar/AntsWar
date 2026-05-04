package com.antswar.backend.game.application.port.out;

import com.antswar.backend.game.domain.purchase.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
}
