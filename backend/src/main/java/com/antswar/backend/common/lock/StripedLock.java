package com.antswar.backend.common.lock;

import com.antswar.backend.exception.LockTimeoutException;
import lombok.extern.slf4j.Slf4j;

import java.util.Objects;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;

@Slf4j
public class StripedLock<K> implements KeyedLock<K> {
    private final ReentrantLock[] locks;
    private final int mask;
    private final int defaultTimeoutSeconds;

    public StripedLock(int stripes, int defaultTimeoutSeconds) {
        if (Integer.bitCount(stripes) != 1) {
            throw new IllegalArgumentException("stripes must be power of two");
        }
        if (defaultTimeoutSeconds < 1) {
            throw new IllegalArgumentException("defaultTimeoutSeconds must be positive");
        }
        this.locks = new ReentrantLock[stripes];
        for (int i = 0; i < stripes; i++) {
            locks[i] = new ReentrantLock();
        }
        this.mask = stripes - 1;
        this.defaultTimeoutSeconds = defaultTimeoutSeconds;
    }

    /**
     * defaultTimeoutSeconds으로 락을 획득하고 실패 시 예외
     */
    @Override
    public void withLock(K key, Runnable body) {
        withLock(key, defaultTimeoutSeconds, body);
    }

    /**
     * 지정 timeout으로 락을 획득하고 실패 시 예외
     */
    @Override
    public void withLock(K key, int timeoutSeconds, Runnable body) {
        Objects.requireNonNull(key);
        Objects.requireNonNull(body);
        if (timeoutSeconds < 1) throw new IllegalArgumentException("timeoutSeconds must be positive");

        ReentrantLock lock = lockFor(key);
        boolean acquired = false;
        try {
            acquired = lock.tryLock(timeoutSeconds, TimeUnit.SECONDS);
            if (!acquired) throw new LockTimeoutException(key, timeoutSeconds);
            log.debug("acquire lock : {}", key);
            body.run();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException(e);
        } finally {
            if (acquired) lock.unlock();
            log.debug("unLock : {}", key);
        }
    }

    private ReentrantLock lockFor(K key) {
        int idx = spread(key.hashCode()) & mask;
        log.debug("lockFor : key={}, locks[{}]",key, idx);
        return locks[idx];
    }

    private static int spread(int h) {
        return h ^ (h >>> 16);
    }
}
