package com.antswar.backend.game.application.dto;

import com.antswar.backend.game.domain.item.Item;
import com.antswar.backend.game.domain.vo.Money;

import java.util.Arrays;
import java.util.List;

public record ItemInfo(String code, Money price) {
    public static ItemInfo from(Item item){
        return new ItemInfo(item.name(), item.getPrice());
    }

    public static List<ItemInfo> from() {
        return Arrays.stream(Item.values())
                .map(ItemInfo::from)
                .toList();

    }
}
