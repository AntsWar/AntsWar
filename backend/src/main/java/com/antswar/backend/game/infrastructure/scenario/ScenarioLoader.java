package com.antswar.backend.game.infrastructure.scenario;

import com.antswar.backend.game.domain.news.EventNews;
import com.antswar.backend.game.domain.purchase.PurchaseMeta;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.util.*;

/**
 * 카테고리와 번호를 받아 시나리오 파일을 로드하는 인프라 컴포넌트.
 *
 * <p>파일 경로 규칙: {@code classpath:events/{category}/{number:03d}.json}
 * (예: category="IT", number=1 → {@code events/IT/001.json})</p>
 *
 * <p>어떤 번호를 선택할지는 {@link com.antswar.backend.game.application.ScenarioManager}의 책임이다.</p>
 */
@Slf4j
@RequiredArgsConstructor
@Component
public class ScenarioLoader {
    private final ApplicationContext ctx;
    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * 카테고리와 번호로 시나리오를 로드한다.
     *
     * @param category 카테고리명 (예: "IT")
     * @param number   시나리오 번호 (예: 1 → {@code 001.json})
     * @return 파싱된 {@link EventScenario}
     * @throws IllegalArgumentException 파일이 없거나 파싱에 실패한 경우
     */
    public List<EventNews> load(String category, int number) {
        String path = "classpath:events/%s/%03d.json".formatted(category, number);
        try {
            Resource resource = ctx.getResource(path);
            ScenarioJson json = objectMapper.readValue(resource.getInputStream(), ScenarioJson.class);
            return toNewsList(json);
        } catch (Exception e) {
            throw new IllegalArgumentException("시나리오 로드 실패: " + path, e);
        }
    }

    private List<EventNews> toNewsList(ScenarioJson json) {
        return json.news.stream()
                .map(n -> {
                    List<String> basics = n.basicRumors == null ? List.of()
                            : n.basicRumors.stream().map(r -> r.content).toList();
                    List<String> premiums = n.premiumRumors == null ? List.of()
                            : n.premiumRumors.stream().map(r -> r.content).toList();
                    return new EventNews(n.title, n.content, toEffects(n.effects), basics, premiums);
                })
                .toList();
    }

    private Map<PurchaseMeta, Integer> toEffects(Map<String, Integer> raw) {
        Map<PurchaseMeta, Integer> result = new EnumMap<>(PurchaseMeta.class);
        raw.forEach((code, impact) -> {
            try {
                result.put(PurchaseMeta.valueOf(code), impact);
            } catch (IllegalArgumentException ignored) {
            }
        });
        return result;
    }

    // ── JSON 역직렬화 전용 내부 구조체 ─────────────────────────────────────
    @JsonIgnoreProperties(ignoreUnknown = true)
    private static class ScenarioJson {
        public String eventTitle;
        public List<NewsJson> news;

        @JsonIgnoreProperties(ignoreUnknown = true)
        private static class NewsJson {
            public String title;
            public String content;
            public Map<String, Integer> effects;
            public List<RumorJson> basicRumors;
            public List<RumorJson> premiumRumors;
        }

        private static class RumorJson {
            public String content;
        }
    }
}
