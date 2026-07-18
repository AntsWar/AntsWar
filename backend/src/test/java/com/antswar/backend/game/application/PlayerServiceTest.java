package com.antswar.backend.game.application;

import com.antswar.backend.game.application.port.in.PurchaseTrade;
import com.antswar.backend.game.application.port.in.request.BuyPurchaseCommand;
import com.antswar.backend.game.application.port.out.PlayerRepository;
import com.antswar.backend.game.domain.Game;
import com.antswar.backend.game.domain.player.Player;
import com.antswar.backend.game.domain.player.PositionType;
import com.antswar.backend.game.domain.purchase.Purchase;
import com.antswar.backend.game.exception.GameException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.support.TransactionTemplate;

import java.time.LocalDateTime;
import java.util.concurrent.*;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PlayerServiceTest {
    @Autowired
    private PurchaseTrade purchaseTrade;
    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private TransactionTemplate transactionTemplate;
    @PersistenceContext
    private EntityManager em;
    private ExecutorService executor;

    @BeforeEach
    void setUp() {
        executor = Executors.newFixedThreadPool(2);
    }

    @AfterEach
    void tearDown() {
        executor.shutdownNow();
    }

    @Test
    void Concurrency_Issue() throws InterruptedException, ExecutionException {
        Game game = new Game(1L,
                LocalDateTime.of(2026,1,1,1,0),
                LocalDateTime.of(2026,1,1,1,30));
        Player player = Player.user("테스트", game);
        Purchase purchase = game.getPurchases().getFirst();

        transactionTemplate.executeWithoutResult(status -> {
            em.persist(game);
            playerRepository.save(player);
        });

        BuyPurchaseCommand command = new BuyPurchaseCommand(PositionType.LONG, purchase.getId(), 9);

        CountDownLatch ready = new CountDownLatch(2);
        CountDownLatch start = new CountDownLatch(1);

        Callable<Boolean> buy = () -> {
            ready.countDown(); // 준비 완료
            start.await();     // 출발 신호 대기
            try {
                purchaseTrade.buy(player.getId(), command);
                return true;
            } catch (GameException exception) {
                return false;
            }
        };

        Future<Boolean> first = executor.submit(buy);
        Future<Boolean> second = executor.submit(buy);

        ready.await();
        start.countDown(); // 동시에 출발

        assertTrue(first.get() ^ second.get());
    }
}