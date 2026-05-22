package com.antswar.backend.game.domain.news;

import com.antswar.backend.game.domain.purchase.PurchaseMeta;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class NewsBoard {
    private final List<News> newsList = new ArrayList<>();
    private final Map<PurchaseMeta, Integer> impactMap = new EnumMap<>(PurchaseMeta.class);

    public void add(News news) {
        newsList.add(news);
        NewsMeta meta = news.getMeta();
        meta.getEffects().forEach(effect ->
                impactMap.merge(effect.meta(), effect.impact(), Integer::sum)
        );
    }

    public void tick() {
        Iterator<News> it = newsList.iterator();

        while (it.hasNext()) {
            News news = it.next();
            NewsMeta meta = news.getMeta();

            if (news.tickAndExpired()) {
                meta.getEffects().forEach(effect ->
                        impactMap.merge(effect.meta(), -effect.impact(), Integer::sum)
                );
                it.remove();
            }
        }
    }

    public int impactOf(PurchaseMeta purchaseMeta) {
        return impactMap.getOrDefault(purchaseMeta, 0);
    }
}
