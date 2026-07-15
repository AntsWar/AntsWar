package com.antswar.backend.game.application.tick;

import com.antswar.backend.game.application.dto.ChatInfo;
import com.antswar.backend.game.application.port.out.PlayerRepository;
import com.antswar.backend.game.domain.Game;
import com.antswar.backend.game.domain.player.Player;
import com.antswar.backend.game.domain.vo.Money;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Component
@RequiredArgsConstructor
public class BotTickHandler implements TickHandler{
    private final PlayerRepository playerRepository;
    private final ApplicationEventPublisher eventPublisher;
    private final Random random;

    @Override
    public void handle(Game game, LocalDateTime now) {
        List<Player> bots = playerRepository.findAllByGameAndBotIsTrue(game);

        for (Player bot : bots) {
            if(random.nextDouble() < 0.005){
                eventPublisher.publishEvent(new ChatInfo(bot.getName(),BOT_CHATS.get(random.nextInt(BOT_CHATS.size()))));
            }
            if (random.nextDouble() > 0.35) {
                continue;
            }
            double multiplier = random.nextDouble(0.95, 1.06);
            Money money = bot.getBalance().times(multiplier);
            if(money.compareTo(Money.of(1_000)) <0){
                money = Money.of(3_000);
            }
            bot.changeBalance(money);
        }
    }
    private static final List<String> BOT_CHATS = List.of(
            "이거 오르는 거 맞냐?",
            "난 방금 풀매수함",
            "지금 들어가도 안 늦었지?",
            "또 속넼ㅋㅋㅋㅋ",
            "이거 너무 오른 거 아님?",
            "난 숏 간다",
            "오늘은 코인 같은데",
            "이거 호재 아님?",
            "악재 같은데 왜 오르냐",
            "누가 설명 좀",
            "난 일단 관망",
            "지금 물타는 중",
            "벌써 반영된 거 아님?",
            "방금 전량 매도함",
            "다들 롱만 보네",
            "이거 냄새가 좋은데",
            "느낌이 쎄하다",
            "오늘 변동성 미쳤네",
            "또 나만 손해보네",
            "이거 진짜 가냐?",
            "난 이거 믿는다",
            "지금이 바닥 같은데",
            "고점 신호 아님?",
            "이거 개꿀인데",
            "지금 들어가면 물리냐",

            "오늘 쉽지 않네",
            "왜 오르지",
            "왜 떨어지지",
            "이상한데",
            "난 못 먹겠다",
            "이거 끝난 거 아님?",
            "이거 시작 같은데",
            "벌써 무섭다",
            "존버 간다",
            "손절할까",
            "익절할까",
            "계속 들고 간다",
            "이거 믿어도 되냐",
            "뭔가 있다",
            "느낌 온다",
            "느낌 안 온다",
            "이건 아닌 듯",
            "생각보다 강한데",
            "생각보다 약한데",
            "오늘 롤러코스터네",
            "미쳤다",
            "개떡락",
            "개떡상",
            "이게 맞냐",
            "아까 팔았는데",
            "아까 살걸",
            "또 놓쳤네",
            "또 물렸네",

            "형들 어떰?",
            "다들 어디 보고 있음?",
            "지금 뭐 삼?",
            "추천 좀",
            "오늘 뭐가 제일 좋냐",
            "다들 수익 중?",
            "나만 마이너스냐",
            "다들 왜 조용함",
            "사람 없네",
            "채팅 좀 해라",
            "무섭다 진짜",
            "다들 자신감 넘치네",
            "난 자신 없다",
            "오늘은 쉬운 장이다",
            "오늘은 어려운 장이다",

            "전재산 박음",
            "책임은 안 짐",
            "형 믿고 간다",
            "이거 안 사는 사람 있음?",
            "난 끝까지 간다",
            "여기서 튄다",
            "이거 마지막 기회 아님?",
            "다들 조심해라",
            "이건 못 참지",
            "나만 좋냐",
            "나만 이상하냐",
            "뭔가 잘못됐다",
            "개미 털기 시작됐네",
            "개미 털기 끝났네",
            "세력 있다",
            "세력 나갔다",
            "이거 장난 아닌데",
            "냄새가 난다",
            "큰 거 온다",
            "큰 거 안 온다",

            "숏 맛있다",
            "롱 맛있다",
            "숏 치는 사람 없냐",
            "롱 치는 사람 없냐",
            "다들 롱이네",
            "다들 숏이네",
            "반대로 가야 하나",
            "역시 시장은 어렵다",
            "또 시장한테 맞았네",
            "오늘도 배운다",

            "이거 진짜 모르겠다",
            "이쯤 되면 운이다",
            "기도 메타 간다",
            "제발 올라라",
            "제발 내려라",
            "한강 예약",
            "오늘은 내가 이긴다",
            "오늘은 시장이 이긴다",
            "손이 떨린다",
            "심장이 뛴다",
            "몰?루",
            "난 간다",
            "난 빠진다",
            "구경만 한다",
            "여기까지다"
    );
}
