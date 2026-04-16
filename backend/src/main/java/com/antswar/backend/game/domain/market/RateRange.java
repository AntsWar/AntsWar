package com.antswar.backend.game.domain.market;

public record RateRange(double min, double max) {
    public RateRange {
        if (min > max) {
            throw new IllegalArgumentException("min은 max보다 클 수 없습니다.");
        }
    }
}