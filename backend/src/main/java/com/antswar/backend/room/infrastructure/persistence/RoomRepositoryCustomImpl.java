package com.antswar.backend.room.infrastructure.persistence;

import com.antswar.backend.room.application.dto.RoomCond;
import com.antswar.backend.room.application.dto.SearchRoomQuery;
import com.antswar.backend.room.domain.Room;
import com.antswar.backend.room.domain.RoomStatus;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.antswar.backend.room.domain.QRoom.room;
import static org.springframework.util.StringUtils.hasText;

@RequiredArgsConstructor
@Repository
public class RoomRepositoryCustomImpl implements RoomRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Room> findAllByCond(RoomCond cond) {
        return queryFactory
                .selectFrom(room)
                .where(
                        roomStatusEq(cond.status()),
                        roomNameLike(cond.name())
                )
                .fetch();
    }

    private BooleanExpression roomNameLike(String name) {
        return hasText(name)? room.name.like("%" + name + "%"): null;
    }

    private BooleanExpression roomStatusEq(RoomStatus status) {
        return status != null ? room.status.eq(status) : null;
    }
}
