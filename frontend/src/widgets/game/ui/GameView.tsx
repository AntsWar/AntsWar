import { useMeQuery } from "@/features/getMe"
import { qk } from "@/shared/quries/keys"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useMemo, useState } from "react"
import { useGame } from "@/features/game/getGame"
import type { Game } from "@/entities/game"
import GameSection from "./GameSection"
import GameStatusBar from "./GameStatusBar"
import { FinishedDialog } from "@/features/game/finishedGame"

const NEWS_TOAST_MESSAGES: Record<string, string> = {
  SAMSON_GOOD_PERFORMANCE: "삼손전자 실적. 시장 기대치를 넘어",
  SKY_HIGH_GOOD_PERFORMANCE: "SKY하이 호실적 발표",
  NVIDEO_GOOD_PERFORMANCE: "엔비디오 실적 크게 개선",
  ARMD_GOOD_PERFORMANCE: "ARMD 실적, 시장 예상 웃돌아.",
  OUTEL_GOOD_PERFORMANCE: "아웃텔 실적 반등",
  PSMC_GOOD_PERFORMANCE: "PSMC 실적 강세",
  GOLDMAN_SOCKS_GOOD_PERFORMANCE: "골드무한삭스 실적 개선",

  AI_MARKETS_GROWTH: "AI 시장 성장",
  INSUFFICIENT_MEMORY_SUPPLY: "메모리 공급 부족 우려",
  INSUFFICIENT_CPU_SUPPLY: "CPU 공급 부족 우려",
  INCREASING_FOUNDRY_DEMAND: "파운드리 수요 증가",
  INCREASE_INTEREST_RATE: "금리 인상",
  PSMC_1_NANO_ADVANCEMENT: "PSMC, 1나노 공정 진전에 성공",
  SAMSON_2_NANO_STABILIZATION: "삼손전자, 2나노 공정 안정화",
  AGENTIC_AI_AGE: "Agentic AI 시대. 돌아온 CPU",
  BANK_MADE_COIN: "은행권 자체 코인 출시 기대감",
  INCREASED_DEMAND_FOR_ARM_BASED_CPU: "ARM 기반 CPU 수요 증가 전망",
  COINS_ARE_FUTURE: "코인이 미래다.",

  SAMSON_BAD_PERFORMANCE: "삼손전자 실적 부진",
  SKY_HIGH_BAD_PERFORMANCE: "SKY하이 실적. 시장 기대를 밑돌아..",
  NVIDEO_BAD_PERFORMANCE: "엔비디오 실적 둔화",
  ARMD_BAD_PERFORMANCE: "ARMD 실적 부진 소식",
  OUTEL_BAD_PERFORMANCE: "아웃텔 실적 악화",
  PSMC_BAD_PERFORMANCE: "PSMC 실적 부진",
  GOLDMAN_SOCKS_BAD_PERFORMANCE: "골드무한삭스 실적 악화",

  AI_SLOW_DEMAND: "AI 수요 둔화 우려",
  GPU_COMPETITION_INTENSIFIES: "GPU 시장 경쟁 심화",
  MEMORY_COMPETITION_INTENSIFIES: "메모리 시장 경쟁 격화",
  CPU_COMPETITION_INTENSIFIES: "CPU 시장 가격 경쟁 심화",
  DECREASE_INTEREST_RATE: "금리 인하",
  SEMICONDUCTOR_SUPPLY_CHAIN_DISRUPTIONS: "반도체 공급망 차질 우려",
  COINS_ARE_NOT_FUTURE: "코인. 정말 미래가 맞나?",
}

export default function GameView(props: { game: Game }) {
  const { game } = props
  const { data: me } = useMeQuery()
  const [finished, setFinished] = useState(false)

  const queryClient = useQueryClient()

  const gameStateOptions = useMemo(
    () => ({
      onPurchaseDelist: ({ name }: { name: string }) => {
        toast.info(`${name}(이)가 상폐되었습니다.`)
        queryClient.invalidateQueries({ queryKey: qk.getMe() })
      },
      onNotice: (code: string) => {
        const message = NEWS_TOAST_MESSAGES[code] ?? code

        toast.info(message)
      },
      onFinished: () => {
        setFinished(true)
      },
    }),
    [queryClient]
  )

  const { meta, players, purchases, serverTime } = useGame(
    game,
    gameStateOptions
  )

  return (
    <>
      <FinishedDialog open={finished} players={players} />
      <GameStatusBar
        meta={meta}
        serverTime={serverTime}
        balance={me?.player.balance ?? { amount: 0 }}
      />
      <GameSection
        players={players}
        purchases={purchases}
        positions={me?.positions ?? []}
      />
    </>
  )
}
