package com.antswar.backend.common.lock;

import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.concurrent.locks.ReentrantLock;
import java.util.stream.IntStream;

@Component
public class LocalLockManager {

    private static final int LOCK_COUNT = 32;

    private final ReentrantLock[] locks =
            IntStream.range(0, LOCK_COUNT)
                    .mapToObj(index -> new ReentrantLock())
                    .toArray(ReentrantLock[]::new);

    public ReentrantLock getLock(Object key) {
        Objects.requireNonNull(key, "락 키는 null일 수 없습니다.");
        int lockIndex = Math.floorMod(key.hashCode(), LOCK_COUNT);

        return locks[lockIndex];
    }
}