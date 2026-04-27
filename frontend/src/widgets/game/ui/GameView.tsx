import { PlayerTable } from "@/entities/player"
import { StartGameButton, StartGameOverlay } from "@/features/game/startGame"
import { MarketSection } from "@/features/market"
import { PortfolioSection, useMeQuery } from "@/features/getMe"
import { Money } from "@/shared/model/Money"
import { qk } from "@/shared/quries/keys"
import { useQueryClient } from "@tanstack/react-query"
import { formatTimeToHMS } from "@/shared/lib/formatTime"
import { Banknote } from "lucide-react"
import { RoomSection, type Room } from "@/entities/room"
import { TapToEarnButton } from "@/features/earn/earnByClick"
import { toast } from "sonner"
import { useEffect, useMemo, useState } from "react"
import { useGame } from "@/features/game/getGame"
import type { Game, GameMeta } from "@/entities/game"
import { FinishedOverlay } from "@/features/game/finishedGame"

const NOTICE_MESSAGES: Record<string, string> = {
  E1: "삼손전자 호재 발생",
  E2: "반도체 규제 강화",
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

  const gameStateOptions = useMemo(
    () => ({
      onGameReady: () => setIsStarting(true),
      onGameStart: () => setIsStarting(false),
      onPurchaseDelist: ({ name }: { name: string }) => {
        toast(`${name}(이)가 상폐되었습니다.`)
        queryClient.invalidateQueries({ queryKey: qk.getMe(room.id) })
      },
      onNotice: (code: string) => {
        const message = NOTICE_MESSAGES[code] ?? code

        toast(message)
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
      <div className="flex flex-col gap-7">
        <div>
          <RoomSection name={room.name} mode={room.mode} />
          <PlayerTable players={players} />
        </div>

        <MarketSection purchases={purchases} />
        <PortfolioSection positions={me?.positions ?? []} />
        <TapToEarnButton gameId={room.id} disable={meta.status !== "RUNNING"} />
      </div>
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
            <StartGameButton className="w-full" gameId={room.id} />
          )}
        </div>
        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-row gap-2">
            {formatTimeToHMS(meta.status === "RUNNING" ? elapsed : 0)}
            <div>
              {room.mode.type === "TIME" && meta.status === "RUNNING" && (
                <span>
                  (남은시간 : {formatTimeToHMS(room.mode.target - elapsed)})
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Banknote />
            <Money money={balance} />
          </div>
        </div>
      </div>
    </div>
  )
}
