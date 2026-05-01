import { PlayerTable } from "@/entities/player"
import { StartGameButton, StartGameOverlay } from "@/features/game/startGame"
import { MarketInfo } from "@/features/market"
import { PortfolioInfo, useMeQuery } from "@/features/getMe"
import { Money } from "@/shared/model/Money"
import { qk } from "@/shared/quries/keys"
import { useQueryClient } from "@tanstack/react-query"
import { formatTimeToHMS } from "@/shared/lib/formatTime"
import { Banknote, BriefcaseBusiness, Clock, Gift } from "lucide-react"
import { RoomInfo, type Room } from "@/entities/room"
import { TapToEarnButton } from "@/features/earn/earnByClick"
import { toast } from "sonner"
import { useEffect, useMemo, useState } from "react"
import { useGame } from "@/features/game/getGame"
import type { Game, GameMeta } from "@/entities/game"
import { FinishedOverlay } from "@/features/game/finishedGame"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldTitle,
} from "@/shared/ui/field"
import MarketIcon from "@/assets/icon/market_icon.svg?react"
import { Button } from "@/shared/ui/button"
import { useNavigate } from "react-router"

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

export default function GameView(props: {
  room: Room
  game: Game
  isHost: boolean
}) {
  const { room, game, isHost } = props
  const [isStarting, setIsStarting] = useState<boolean>(false)
  const { data: me } = useMeQuery(room.id)

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const gameStateOptions = useMemo(
    () => ({
      onGameReady: () => setIsStarting(true),
      onGameStart: () => setIsStarting(false),
      onPurchaseDelist: ({ name }: { name: string }) => {
        toast.info(`${name}(이)가 상폐되었습니다.`)
        queryClient.invalidateQueries({ queryKey: qk.getMe(room.id) })
      },
      onNotice: (code: string) => {
        const message = NEWS_TOAST_MESSAGES[code] ?? code

        toast.info(message)
      },
    }),
    [queryClient, room.id]
  )

  const { meta, players, purchases, serverTime } = useGame(
    room.id,
    gameStateOptions,
    game
  )

  return (
    <>
      <StartGameOverlay open={isStarting} />
      <FinishedOverlay open={meta.status === "FINISHED"} players={players} />
      <Header
        room={room}
        isHost={isHost}
        meta={meta}
        serverTime={serverTime}
        balance={me?.player.balance ?? { amount: 0 }}
      />
      <FieldGroup>
        <Field className="flex flex-row justify-between px-2">
          <RoomInfo name={room.name} mode={room.mode} />
          {meta.status === "WAITING" && (
            <Button className="w-fit!" onClick={() => navigate("/")}>
              나가기
            </Button>
          )}
        </Field>
        <Field className="rounded-xl border bg-popover p-4">
          <FieldContent>
            <PlayerTable players={players} />
          </FieldContent>
        </Field>
        <Field className="w-full rounded-xl border bg-popover p-4">
          <FieldTitle className="text-xl font-semibold">
            <MarketIcon className="size-8 text-primary" />
            시장
          </FieldTitle>
          <FieldDescription>
            가격이 <Money money={{ amount: 100 }} /> 아래로 떨어지면 상폐됩니다.
          </FieldDescription>
          <FieldContent>
            <MarketInfo purchases={purchases} />
          </FieldContent>
        </Field>
        <Field className="rounded-xl border bg-popover p-4">
          <FieldTitle className="text-xl font-semibold">
            <BriefcaseBusiness className="size-6 text-primary" />
            포트폴리오
          </FieldTitle>
          <FieldDescription>
            상장폐지된 종목은 자동으로 청산됩니다.
          </FieldDescription>
          <FieldContent>
            <PortfolioInfo positions={me?.positions ?? []} />
          </FieldContent>
        </Field>
        <Field className="rounded-xl border bg-popover p-4">
          <FieldTitle className="text-xl font-semibold">
            <Gift className="size-6 text-primary" />
            시드벌기
          </FieldTitle>
          <FieldDescription>
            돈이 모자라면 여기서 버실 수 있습니다.
          </FieldDescription>
          <FieldContent>
            <TapToEarnButton
              gameId={room.id}
              disable={meta.status !== "RUNNING"}
            />
          </FieldContent>
        </Field>
      </FieldGroup>
    </>
  )
}

function Header(props: {
  room: Room
  isHost: boolean
  meta: GameMeta
  serverTime: number
  balance: Money
}) {
  const { room, isHost, meta, serverTime, balance } = props
  const [elapsed, setElapsed] = useState<number>(0)

  useEffect(() => {
    if (meta.status !== "RUNNING") return

    const offset = serverTime - Date.now()
    const startedAt = new Date(meta.startedAt).getTime()

    const updateElapsed = () => {
      const expectedServerTime = Date.now() + offset
      const nextElapsed = Math.max(
        0,
        Math.floor((expectedServerTime - startedAt) / 1000)
      )

      setElapsed(nextElapsed)
    }

    updateElapsed()

    const timer = window.setInterval(updateElapsed, 250)

    return () => window.clearInterval(timer)
  }, [meta.startedAt, meta.status, serverTime])

  return (
    <div className="sticky top-0 z-10 bg-background py-2">
      <div className="flex flex-col gap-2">
        <div>
          {isHost && meta.status === "WAITING" && (
            <StartGameButton className="w-full self-center" gameId={room.id} />
          )}
        </div>
        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-row items-center gap-2 rounded-xl">
            <Clock className="size-5 text-primary" />
            {formatTimeToHMS(meta.status === "RUNNING" ? elapsed : 0)}
            {room.mode.type === "TIME" && meta.status === "RUNNING" && (
              <div className="text-base text-muted-foreground">
                (남은시간 : {formatTimeToHMS(room.mode.target - elapsed)})
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Banknote className="text-primary" />
            <Money money={balance} />
          </div>
        </div>
      </div>
    </div>
  )
}
