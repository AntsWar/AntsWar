package com.antswar.backend.game.domain.game;

import com.antswar.backend.game.domain.news.News;
import com.antswar.backend.game.domain.news.NewsMeta;
import com.antswar.backend.game.domain.purchase.PurchaseMeta;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class NewsBoard {
    private final List<News> newsList = new ArrayList<>();
    private final Map<PurchaseMeta, Integer> impactMap = new EnumMap<>(PurchaseMeta.class);

    public void add(News news) {
        newsList.add(news);
        apply(news.getMeta());
    }

    public void remove(News news) {
        if (newsList.remove(news)) {
            revert(news.getMeta());
        }
    }

    public void tick() {
        Iterator<News> it = newsList.iterator();

        while (it.hasNext()) {
            News news = it.next();

            if (news.tickAndExpired()) {
                revert(news.getMeta());
                it.remove();
            }
        }
    }

    public int impactOf(PurchaseMeta purchaseMeta) {
        return impactMap.getOrDefault(purchaseMeta, 0);
    }

    private void apply(NewsMeta meta) {
        meta.getEffects().forEach(effect ->
                impactMap.merge(effect.meta(), effect.impact(), Integer::sum)
        );
    }

    private void revert(NewsMeta meta) {
        meta.getEffects().forEach(effect ->
                impactMap.merge(effect.meta(), -effect.impact(), Integer::sum)
        );
    }
}
