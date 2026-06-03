package com.antswar.backend.common.jpa;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.AccessLevel;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Getter(AccessLevel.PROTECTED)
@MappedSuperclass
public abstract class SoftDeleteEntity extends BaseEntity {

    @Column(name = "deleted_at")
    protected LocalDateTime deletedAt;

    public boolean isDeleted() {
        return deletedAt != null;
    }

    protected void delete() {
        if (isDeleted()) {
            return;
        }
        this.deletedAt = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
    }

    protected void restore() {
        if (!isDeleted()) {
            return;
        }
        this.deletedAt = null;
    }
}
