package com.antswar.backend.common.jpa;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.AccessLevel;
import lombok.Getter;

import java.time.Instant;

@Getter(AccessLevel.PROTECTED)
@MappedSuperclass
public abstract class SoftDeleteEntity extends BaseEntity {

    @Column(name = "deleted_at")
    protected Instant deletedAt;

    public boolean isDeleted() {
        return deletedAt != null;
    }

    protected void delete() {
        if (isDeleted()) {
            return;
        }
        this.deletedAt = Instant.now();
    }

    protected void restore() {
        if (!isDeleted()) {
            return;
        }
        this.deletedAt = null;
    }
}
