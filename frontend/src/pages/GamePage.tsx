import { JoinDialog } from "@/features/game/joinGame"
import { StompProvider, useStompClient } from "@/shared/lib/stomp/StompProvider"
import {
  GameSocketProvider,
  useGameSocketEvent,
  type Game,
} from "@/entities/game"
import GameSection from "@/widgets/game/ui/GameSection"
import { FinishedDialog } from "@/features/game/finishedGame"
import { ChatBox } from "@/features/chat"
import { useEffect, useState } from "react"
import RemainingTime from "@/features/game/remainingTime/RemainingTime"
import { Banknote, Clock, MessageCircle } from "lucide-react"
import { MoneyText } from "@/shared/model/Money"
import { useMeQuery, useScoreStore, type Me } from "@/features/getMe"
import { Button } from "@/shared/ui/button"
import { cn } from "@/shared/ui/lib"
import type { Purchase } from "@/entities/purchase"
import type { Player } from "@/entities/player"
import { NEWS_META, useNoticeStore } from "@/entities/news"
import { toast } from "sonner"
import { queryClient } from "@/shared/quries/queryClient"
import { qk } from "@/shared/quries/keys"

export default function GamePage() {
  const [init, setInit] = useState<Game | null>(null)

  return (
    <>
      <JoinDialog open={init === null} setGame={setInit} />
      {init && (
        <StompProvider>
          <GameSocketProvider gameId={init.id}>
            <GameView init={init} />
          </GameSocketProvider>
        </StompProvider>
      )}
    </>
  )
}

function GameView({ init }: { init: Game }) {
  const [game, setGame] = useState<Game>(init)
  const { connected, getClient } = useStompClient()
  const [finished, setFinished] = useState<boolean>(false)
  const [chatOpen, setChatOpen] = useState(() => {
    return window.matchMedia("(min-width: 1024px)").matches
  })
  const { data: me } = useMeQuery()

  useGameSocketEvent("GAME_UPDATED", (payload) => {
    const msg = payload as {
      purchases: Array<Purchase>
      players: Array<Player>
      serverTime: string
    }

    setGame((prev) => {
      if (!prev) return prev

      return {
        ...prev,
        purchases: msg.purchases,
        players: msg.players,
        serverTime: msg.serverTime,
      }
    })
  })

  useGameSocketEvent("FINISHED", () => {
    setFinished(true)
  })

  useGameSocketEvent("NOTICE", (payload) => {
    const expiredAt = useNoticeStore.getState().expiredAt

    const noticeRate = expiredAt > Date.now() ? 1.0 : 0.3
    if (Math.random() < noticeRate) {
      const code = payload as string
      const message = NEWS_META[code] ?? code
      toast.info(message)
    }
  })

  useGameSocketEvent("PURCHASE_DELIST", (payload) => {
    const { name } = payload as { name: string }
    toast.info(`${name}(이)가 상폐되었습니다.`)
    queryClient.invalidateQueries({
      queryKey: qk.getMe(),
    })
  })

  useEffect(() => {
    if (!connected) return

    const client = getClient()
    if (!client) return

    const sub = client.subscribe("/user/queue", ({ body }) => {
      try {
        const message = JSON.parse(body)
        if (message.type === "BANKRUPT") setFinished(true)
      } catch {
        /* empty */
      }
    })

    return () => sub.unsubscribe()
  }, [connected, getClient])

  useEffect(() => {
    if (finished) return

    const timer = setInterval(() => {
      const currentMe = queryClient.getQueryData<Me>(qk.getMe())
      if (!currentMe) return
      useScoreStore.getState().addScore(currentMe.player.asset)
    }, 1000)

    return () => clearInterval(timer)
  }, [finished])

  return (
    <div className="flex h-full justify-center">
      <FinishedDialog open={finished} players={game.players} />
      <div className="flex min-h-0 w-full max-w-2xl flex-col px-3">
        <div className="flex shrink-0 justify-between py-3">
          <div className="flex items-center gap-2 rounded-xl">
            <Clock className="size-5 text-secondary" />
            <div className="text-base text-muted-foreground">
              <RemainingTime
                endedAt={game.meta.endedAt}
                serverTime={game.serverTime}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Banknote className="text-secondary" />
            <MoneyText money={me?.player.balance} />
          </div>
          <div>
            <Button onClick={() => setChatOpen(true)}>
              <MessageCircle />
              채팅
            </Button>
          </div>
        </div>

        <div className="no-scrollbar flex-1 overflow-y-auto pb-4">
          <GameSection game={game} />
        </div>
      </div>
      <div
        className={cn(
          chatOpen ? "block" : "hidden",
          "fixed inset-x-0 top-12 bottom-0 z-40 w-full max-w-2xl px-3 lg:static lg:block lg:h-full lg:w-sm"
        )}
      >
        <ChatBox gameId={game.id} onClose={() => setChatOpen(false)} />
      </div>
    </div>
  )
}
