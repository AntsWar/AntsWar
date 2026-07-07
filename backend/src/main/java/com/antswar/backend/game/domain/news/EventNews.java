package com.antswar.backend.game.domain.news;

import com.antswar.backend.game.domain.purchase.PurchaseMeta;

import java.util.List;
import java.util.Map;


public record EventNews(String title, String content, Map<PurchaseMeta, Integer> effects,
                        List<String> basicRumors, List<String> premiumRumors) {
}
