package com.antswar.backend.game.application.tick;

import lombok.RequiredArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

@Aspect
@Component
@RequiredArgsConstructor
@Order(Ordered.HIGHEST_PRECEDENCE)
public class TickLock {
    private final ReentrantReadWriteLock lock = new ReentrantReadWriteLock(true);

    public Lock readLock() {
        return lock.readLock();
    }

    public Lock writeLock() {
        return lock.writeLock();
    }

    @Around("@annotation(com.antswar.backend.game.application.tick.SharedLock)")
    public Object sharedLock(ProceedingJoinPoint joinPoint) throws Throwable {
        Lock lock = readLock();
        lock.lock();

        try {
            return joinPoint.proceed();
        } finally {
            lock.unlock();
        }
    }

    @Around("@annotation(com.antswar.backend.game.application.tick.ExclusiveLock)")
    public Object exclusiveLock(ProceedingJoinPoint joinPoint) throws Throwable {
        Lock lock = writeLock();
        lock.lock();

        try {
            return joinPoint.proceed();
        } finally {
            lock.unlock();
        }
    }
}