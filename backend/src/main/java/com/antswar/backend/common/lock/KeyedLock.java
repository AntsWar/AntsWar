package com.antswar.backend.common.lock;

public interface KeyedLock<K> {
    void withLock(K key, Runnable body);
    void withLock(K key, int timeout, Runnable body);
}
