CREATE TABLE price_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    purchase_id BIGINT NOT NULL,
    amount DECIMAL(19,4) NOT NULL,
    currency_code VARCHAR(3) NOT NULL,
    recorded_at DATETIME(6) NOT NULL,
    CONSTRAINT fk_price_history_purchase
        FOREIGN KEY (purchase_id) REFERENCES purchase(id)
);

CREATE INDEX idx_price_history_purchase_time
    ON price_history (purchase_id, recorded_at);
