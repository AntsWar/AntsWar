import { useStompClient } from "@/shared/lib/stomp/StompProvider"
import { useGame, type Game } from "@/entities/game"
import { useEffect } from "react"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { qk } from "@/shared/quries/keys"

type GameSocketMessage = {
  type: string
  payload: unknown
}

export function GameSocketListener(props: { gameId: number }) {
  const { gameId } = props
  const { connected, getClient } = useStompClient()
  const { setGame, setFinished } = useGame()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!gameId || !connected) return

    const client = getClient()
    if (!client) return

    const sub = client.subscribe(`/topic/game/${gameId}`, (message) => {
      try {
        const { type, payload } = JSON.parse(message.body) as GameSocketMessage

        switch (type) {
          case "GAME_UPDATED":
            setGame(payload as Game)
            break

          case "PURCHASE_DELIST": {
            const { name } = payload as { name: string }
            toast.info(`${name}(이)가 상폐되었습니다.`)
            queryClient.invalidateQueries({
              queryKey: qk.getMe(),
            })
            break
          }

          case "NOTICE": {
            const code = payload as string
            const message = NEWS_TOAST_MESSAGES[code] ?? code

            toast.info(message)
            break
          }

          case "BEFORE_FINISH":
            toast.info("장 마감 1분 전!!! 액시트 준비하세요")
            break

          case "GAME_FINISHED":
            setFinished(true)
            break
        }
      } catch (e) {
        console.error(e)
      }
    })

    return () => sub.unsubscribe()
  }, [connected, gameId, getClient, queryClient, setFinished, setGame])

  return null
}

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
