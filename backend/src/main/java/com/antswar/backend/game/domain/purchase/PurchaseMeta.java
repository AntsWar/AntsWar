package com.antswar.backend.game.domain.purchase;

import lombok.Getter;

import java.util.List;

@Getter
public enum PurchaseMeta {
    SKY_HIGH("SKY_HIGH", "SKY하이","AI 서버와 스마트폰, 컴퓨터에 사용되는 고성능 메모리 반도체를 개발하고 생산하는 기업", List.of("AI 메모리", "서버용 메모리", "저장용 메모리", "고대역폭 메모리"), PurchaseType.IT),
    NVIDEO("NVIDEO", "앤비디오","인공지능 학습과 그래픽 처리에 필요한 고성능 연산 칩과 관련 소프트웨어를 공급하는 기업", List.of("AI 가속기", "그래픽 칩", "AI 서버", "병렬 연산"), PurchaseType.IT),
    ARMD("ARMD", "AMRD","개인용 컴퓨터와 데이터센터 서버에 들어가는 중앙처리장치를 설계하는 반도체 기업",List.of("PC용 CPU", "서버용 CPU", "데이터센터", "프로세서"), PurchaseType.IT),
    PSMC("PSMC", "PSMC", "다른 기업이 설계한 반도체를 첨단 생산시설과 미세 공정을 이용해 대신 제조하는 기업",List.of("반도체 위탁생산", "웨이퍼", "초미세 공정", "첨단 생산시설"), PurchaseType.IT),

    KOREA_WINGS("KOREA_WINGS", "코리아윙스","미주와 유럽을 잇는 장거리 여객 노선과 항공 화물 운송을 함께 운영하는 대형 국적 항공사", List.of("장거리 노선", "미주·유럽", "항공 화물", "대형 여객기"), PurchaseType.AIRPORT),
    JEJU_JET("JEJU_JET", "제주제트","제주와 동남아 등 인기 여행지를 중심으로 저렴한 단거리 노선을 운영하는 국내 저비용 항공사", List.of("제주 노선", "동남아 여행", "저비용 항공", "단거리 노선"), PurchaseType.AIRPORT),
    JIN_SKY("JIN_SKY", "진스카이","대형 국적 항공사의 지원을 바탕으로 괌과 동남아 노선 및 중대형 여객기를 운용하는 저비용 항공사",List.of("대형 항공사 계열", "괌·동남아", "중대형 여객기", "저비용 항공"), PurchaseType.AIRPORT),
    TWAY_RED("TWAY_RED", "팅웨이레드", "지방 공항을 주요 거점으로 삼고 유럽 등 장거리 노선까지 빠르게 확장하는 저비용 항공사" ,List.of("유럽 노선", "지방 공항", "장거리 저비용 항공", "중대형 여객기"), PurchaseType.AIRPORT),

    HYUNJAE("HYUNJAE", "현재","국내에서 승용차와 SUV, 전기차를 생산해 세계 여러 나라에 수출하는 대형 완성차 기업", List.of("국산 자동차", "SUV", "전기차", "해외 수출"), PurchaseType.CAR),
    TESLAR("TESLAR", "퉤슬라","전기차와 급속 충전망, 자율주행 소프트웨어를 중심으로 성장한 미국 자동차 기업", List.of("순수 전기차", "급속 충전", "자율주행", "차량 소프트웨어"), PurchaseType.CAR),
    YODA("YODA", "요다", "높은 연비와 내구성을 갖춘 하이브리드 차량을 세계적으로 판매하는 일본 자동차 기업",List.of("하이브리드", "높은 연비", "내구성", "일본 자동차"), PurchaseType.CAR),
    MIZZ("MIZZ", "미쯔", "고급 세단과 고성능 차량을 중심으로 판매하는 독일 프리미엄 자동차 기업" ,List.of("고급 세단", "독일 수입차", "고성능 차량", "프리미엄 브랜드"), PurchaseType.CAR),

    BEET_COIN("BEET_COIN", "비즈코인", "발행량이 제한되어 있으며 중앙 운영기관 없이 거래되는 대표적인 디지털 자산", List.of(),PurchaseType.CRYPTO),
    OTHEREUM("OTHEREUM", "이더러움","디지털 계약과 다양한 블록체인 서비스를 실행할 수 있는 범용 가상자산 플랫폼", List.of(),PurchaseType.CRYPTO),
    SOLONA("SOLONA", "솔로나","빠른 처리 속도와 저렴한 수수료를 내세워 결제와 블록체인 앱에 활용되는 디지털 자산", List.of(),PurchaseType.CRYPTO),
    DOG_COIN("DOG_COIN", "도그코인", "인터넷 유행에서 시작해 온라인 커뮤니티와 유명 인사의 관심으로 성장한 디지털 자산", List.of(),PurchaseType.CRYPTO);

    private final String code;
    private final String name;
    private final PurchaseType type;
    private final String description;
    private final List<String> keywords;

    PurchaseMeta(String code, String name, String description, List<String> keywords, PurchaseType type) {
        this.code = code;
        this.name = name;
        this.type = type;
        this.description = description;
        this.keywords = keywords;
    }
}
