package com.antswar.backend.game.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
public class RumorBoard {

    private final Random random;

    private final Map<String, List<String>> basicRumors = new ConcurrentHashMap<>();
    private final Map<String, List<String>> premiumRumors = new ConcurrentHashMap<>();

    public void setNext(String category, List<String> basicRumors, List<String> premiumRumors) {
        this.basicRumors.put(category, new ArrayList<>(basicRumors));
        this.premiumRumors.put(category, new ArrayList<>(premiumRumors));
    }

    public String getBasicRumor(String category) {
        List<String> list = basicRumors.get(category);
        if (list == null || list.isEmpty()) return null;
        return list.get(random.nextInt(list.size()));
    }

    public String getPremiumRumor(String category) {
        List<String> list = premiumRumors.get(category);
        if (list == null || list.isEmpty()) return null;
        return list.get(random.nextInt(list.size()));
    }

    public void reset() {
        basicRumors.clear();
        premiumRumors.clear();
    }
}
