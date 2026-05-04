package com.antswar.backend.game.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Currency;
import java.util.Objects;

@Getter
@Embeddable
@EqualsAndHashCode
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class Money{

    @Column(precision = 19, scale = 4, nullable = false)
    private BigDecimal amount;

    @Column(length = 3, nullable = false)
    private String currencyCode;

    private static final Currency DEFAULT_CURRENCY = Currency.getInstance("KRW");

    protected Money(BigDecimal amount, Currency currency) {
        this.amount = Objects.requireNonNull(amount, "금액은 필수");
        this.currencyCode = Objects.requireNonNull(currency.getCurrencyCode(), "통화는 필수");
        validate();
    }

    public static Money of(long amount) {
        return new Money(BigDecimal.valueOf(amount), DEFAULT_CURRENCY);
    }

    private void validate() {
        if (amount.compareTo(BigDecimal.ZERO) < 0)  throw new IllegalArgumentException("금액은 음수일 수 없음");
    }

    public int compareTo(Money other){
        return amount.compareTo(other.amount);
    }

    public Money add(Money other) {
        checkCurrency(other);
        return new Money(this.amount.add(other.amount), getCurrency());
    }

    public Money subtract(Money other) {
        checkCurrency(other);
        return new Money(this.amount.subtract(other.amount), getCurrency());
    }

    public Money times(double multiplier) {
        if (multiplier < 0) throw new IllegalArgumentException("배수는 음수일 수 없음");
        return new Money(this.amount.multiply(BigDecimal.valueOf(multiplier)), getCurrency());
    }

    public Money divide(int divisor) {
        if (divisor <= 0) throw new IllegalArgumentException("나눌 수 없음");
        return new Money(amount.divide(BigDecimal.valueOf(divisor), RoundingMode.HALF_UP), getCurrency());
    }

    private void checkCurrency(Money other) {
        Objects.requireNonNull(other, "비교 대상이 없음");
        if (!Objects.equals(this.currencyCode, other.currencyCode))
            throw new IllegalArgumentException("통화 다름");
    }

    public Currency getCurrency() {
        return Currency.getInstance(this.currencyCode);
    }
}