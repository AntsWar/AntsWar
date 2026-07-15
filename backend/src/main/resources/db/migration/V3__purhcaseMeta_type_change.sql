ALTER TABLE purchase
    DROP CHECK chk_purchase_meta;

ALTER TABLE purchase
    MODIFY COLUMN meta VARCHAR(50);