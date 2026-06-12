CREATE TABLE game (
    id BIGINT PRIMARY KEY,
    started_at DATETIME(6),
    ended_at DATETIME(6)
);

CREATE TABLE purchase (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    game_id BIGINT NOT NULL,

    meta TINYINT,
    amount DECIMAL(19,4) NOT NULL,
    currency_code VARCHAR(3) NOT NULL,

    is_delisted BIT(1) NOT NULL,
    respawn_tick INT NOT NULL,

    CONSTRAINT fk_purchase_game
        FOREIGN KEY (game_id) REFERENCES game(id),

    CONSTRAINT chk_purchase_meta
        CHECK (meta BETWEEN 0 AND 11)
);

CREATE TABLE player (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    game_id BIGINT,

    name VARCHAR(255),

    amount DECIMAL(19,4) NOT NULL,
    currency_code VARCHAR(3) NOT NULL,

    bot BIT(1) NOT NULL,
    de_active BIT(1) NOT NULL,

    CONSTRAINT fk_player_game
        FOREIGN KEY (game_id) REFERENCES game(id)
);

CREATE TABLE position (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    player_id BIGINT NOT NULL,
    purchase_id BIGINT NOT NULL,

    quantity INT NOT NULL,
    type ENUM ('LONG', 'SHORT'),

    amount DECIMAL(19,4) NOT NULL,
    currency_code VARCHAR(3) NOT NULL,

    CONSTRAINT fk_position_player
        FOREIGN KEY (player_id) REFERENCES player(id),

    CONSTRAINT fk_position_purchase
        FOREIGN KEY (purchase_id) REFERENCES purchase(id)
);

CREATE TABLE chat (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    game_id BIGINT NOT NULL,
    player_id BIGINT NOT NULL,

    content VARCHAR(100) NOT NULL,

    created_at DATETIME(6) NOT NULL,
    updated_at DATETIME(6) NOT NULL
);