package com.antswar.backend.common.lock;

import com.antswar.backend.common.annotation.LocalLock;
import com.antswar.backend.common.annotation.LockKey;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.aop.support.AopUtils;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantLock;

@Aspect
@Component
@RequiredArgsConstructor
@Order(Ordered.HIGHEST_PRECEDENCE)
public class LocalLockAspect {
    private final LocalLockManager localLockManager;

    /*
     * 메서드마다 @LockKey가 위치한 파라미터 인덱스를 저장한다.
     * 최초 호출에만 파라미터를 탐색한다.
     */
    private final Map<Method, Integer> lockKeyIndexCache = new ConcurrentHashMap<>();

    @Around("@annotation(com.antswar.backend.common.annotation.LocalLock)")
    public Object executeWithLock(ProceedingJoinPoint joinPoint) throws Throwable {
        Method method = resolveMethod(joinPoint);
        Object lockKey = resolveLockKey(joinPoint, method);

        ReentrantLock lock = localLockManager.getLock(lockKey);
        lock.lock();

        try {
            return joinPoint.proceed();
        } finally {
            lock.unlock();
        }
    }

    private Method resolveMethod(ProceedingJoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();

        return AopUtils.getMostSpecificMethod(method, joinPoint.getTarget().getClass());
    }

    private Object resolveLockKey(ProceedingJoinPoint joinPoint, Method method) {
        int lockKeyIndex = lockKeyIndexCache.computeIfAbsent(method, this::findLockKeyIndex);

        Object lockKey =
                joinPoint.getArgs()[lockKeyIndex];

        if (lockKey == null) {
            throw new IllegalStateException("@LockKey 값은 null일 수 없습니다: " + method);
        }

        return lockKey;
    }

    private int findLockKeyIndex(Method method) {
        Parameter[] parameters = method.getParameters();

        int lockKeyIndex = -1;

        for (int index = 0; index < parameters.length; index++) {
            if (!parameters[index].isAnnotationPresent(LockKey.class)) {
                continue;
            }

            if (lockKeyIndex != -1) {
                throw new IllegalStateException("@LockKey는 하나만 지정할 수 있습니다: " + method);
            }

            lockKeyIndex = index;
        }

        if (lockKeyIndex == -1) {
            throw new IllegalStateException("@LocalLock 메서드에는 @LockKey가 필요합니다: " + method);
        }

        return lockKeyIndex;
    }
}
