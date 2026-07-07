package com.antswar.backend.game.application;

import com.antswar.backend.game.application.dto.GameEvent;
import com.antswar.backend.game.domain.news.EventNews;
import com.antswar.backend.game.infrastructure.scenario.ScenarioLoader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class ScenarioManager {
    private final ScenarioLoader scenarioLoader;
    private final Random random;
    private final RumorBoard rumorBoard;
    private final PriceBoard priceBoard;
    private final ApplicationEventPublisher eventPublisher;

    private final Queue<EventNews> schedule = new ArrayDeque<>();
    private EventNews eventNews;

    private final int NEWS_TICK = 10;
    private final int TOTAL_TICK = NEWS_TICK * 4;
    private int nowTick = 0;

    public void tick() {
        if(nowTick % TOTAL_TICK==0){
            loadScenario();
        }

        if(nowTick % NEWS_TICK == 0){
            eventNews = schedule.poll();
            if(eventNews != null) {
                rumorBoard.setNext("IT", eventNews.basicRumors(), eventNews.premiumRumors());
            }
        }

        if(nowTick % NEWS_TICK == NEWS_TICK - 1 && eventNews != null){
            eventPublisher.publishEvent(new GameEvent("NOTICE", eventNews.title()));
        }

        if(nowTick % NEWS_TICK == NEWS_TICK - 2 && eventNews != null){
            priceBoard.add(eventNews.effects());
        }

        nowTick++;
    }

    private void loadScenario() {
        try {
            int num = random.nextInt(1, 11);
            schedule.addAll(scenarioLoader.load("IT", num));
        } catch (Exception e) {
            log.error("시나리오 로드 실패", e);
        }
    }
}
