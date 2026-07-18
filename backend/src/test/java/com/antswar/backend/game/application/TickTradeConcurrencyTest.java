package com.antswar.backend.game.application;

import com.antswar.backend.game.application.port.in.PurchaseTrade;
import com.antswar.backend.game.application.port.in.request.BuyPurchaseCommand;
import com.antswar.backend.game.application.port.in.request.SellPurchaseCommand;
import com.antswar.backend.game.application.port.out.PlayerRepository;
import com.antswar.backend.game.application.port.out.PositionRepository;
import com.antswar.backend.game.application.tick.TickHandler;
import com.antswar.backend.game.domain.Game;
import com.antswar.backend.game.domain.player.Player;
import com.antswar.backend.game.domain.player.Position;
import com.antswar.backend.game.domain.player.PositionType;
import com.antswar.backend.game.domain.purchase.Purchase;
import com.antswar.backend.game.exception.GameException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.core.Ordered;
import org.springframework.transaction.support.TransactionTemplate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import static com.antswar.backend.game.exception.GameErrorCode.PURCHASE_DELISTED;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@Import(TickTradeConcurrencyTest.TestConfig.class)
class TickTradeConcurrencyTest {

    private static final long GAME_ID = 9_001L;

    @Autowired
    private TickProcessor tickProcessor;

    @Autowired
    private PurchaseTrade purchaseTrade;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private PositionRepository positionRepository;

    @Autowired
    private TransactionTemplate transactionTemplate;

    @Autowired
    private BlockingDelistHandler blockingDelistHandler;

    @PersistenceContext
    private EntityManager entityManager;

    @Test
    void tick_and_sell_not_execute_concurrently() throws Exception {
        TestData data = createPlayerWithPosition();
        blockingDelistHandler.prepare(data.purchaseId());
        ExecutorService executor = Executors.newFixedThreadPool(2);

        try {
            Future<?> tick = executor.submit(() -> tickProcessor.tick(GAME_ID));
            assertTrue(blockingDelistHandler.awaitEntered());

            Future<GameException> sell = executor.submit(() -> sell(data));

            try {
                assertThrows(TimeoutException.class, () -> sell.get(200, TimeUnit.MILLISECONDS));
            } finally {
                blockingDelistHandler.release();
            }

            tick.get(2, TimeUnit.SECONDS);
            GameException sellException = sell.get(2, TimeUnit.SECONDS);

            assertNotNull(sellException);
            assertEquals(PURCHASE_DELISTED, sellException.getErrorCode());
        } finally {
            blockingDelistHandler.release();
            executor.shutdownNow();
        }

        transactionTemplate.executeWithoutResult(status -> {
            Position position = positionRepository.findById(data.positionId()).orElseThrow();
            Player player = playerRepository.findById(data.playerId()).orElseThrow();

            assertTrue(position.isEmpty(), "상장폐지된 포지션 수량은 0이어야 한다");
            assertEquals(0, player.getBalance().getAmount().compareTo(data.balanceBeforeTick()));
        });
    }

    private GameException sell(TestData data) {
        try {
            purchaseTrade.sell(data.playerId(), new SellPurchaseCommand(data.positionId(), 1));
            return null;
        } catch (GameException exception) {
            return exception;
        }
    }

    private TestData createPlayerWithPosition() {
        Game game = new Game(
                GAME_ID,
                LocalDateTime.of(2026, 1, 1, 1, 0),
                LocalDateTime.of(2026, 1, 1, 1, 30)
        );
        Player player = Player.user("틱-거래 테스트", game);
        Purchase purchase = game.getPurchases().getFirst();

        transactionTemplate.executeWithoutResult(status -> {
            entityManager.persist(game);
            playerRepository.save(player);
        });

        purchaseTrade.buy(
                player.getId(),
                new BuyPurchaseCommand(PositionType.LONG, purchase.getId(), 5)
        );

        return transactionTemplate.execute(status -> {
            Player savedPlayer = playerRepository.findById(player.getId()).orElseThrow();
            Position position = savedPlayer.getPositions().getFirst();

            return new TestData(
                    savedPlayer.getId(),
                    purchase.getId(),
                    position.getId(),
                    savedPlayer.getBalance().getAmount()
            );
        });
    }

    record TestData(
            long playerId,
            long purchaseId,
            long positionId,
            BigDecimal balanceBeforeTick
    ) {
    }

    @TestConfiguration(proxyBeanMethods = false)
    static class TestConfig {

        @Bean
        BlockingDelistHandler blockingDelistHandler() {
            return new BlockingDelistHandler();
        }
    }

    static class BlockingDelistHandler implements TickHandler, Ordered {

        private volatile long purchaseId;
        private volatile CountDownLatch entered;
        private volatile CountDownLatch release;

        void prepare(long purchaseId) {
            this.purchaseId = purchaseId;
            this.entered = new CountDownLatch(1);
            this.release = new CountDownLatch(1);
        }

        boolean awaitEntered() throws InterruptedException {
            return entered.await(1, TimeUnit.SECONDS);
        }

        void release() {
            if (release != null) {
                release.countDown();
            }
        }

        @Override
        public void handle(Game game, LocalDateTime now) {
            if (entered == null) {
                return;
            }

            game.getPurchases().stream()
                    .filter(purchase -> purchase.getId().equals(purchaseId))
                    .findFirst()
                    .ifPresent(purchase -> {
                        entered.countDown();
                        await(release);
                        purchase.delist();
                    });
        }

        @Override
        public int getOrder() {
            return Ordered.HIGHEST_PRECEDENCE;
        }

        private void await(CountDownLatch latch) {
            try {
                latch.await();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new IllegalStateException("테스트 틱 대기가 중단됨", e);
            }
        }
    }
}
