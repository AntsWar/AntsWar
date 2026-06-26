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
import { useMeQuery, useScoreStore, type Me } from "@/features/getMe"
import { useStockStore, type Purchase } from "@/entities/purchase"
import { PlayerTable, type Player } from "@/entities/player"
import { NEWS_META, useNoticeStore } from "@/entities/news"
import { toast } from "sonner"
import { queryClient } from "@/shared/quries/queryClient"
import { qk } from "@/shared/quries/keys"
import { Card } from "@/shared/ui/card"
import Carrier from "@/assets/icon/Carrier.svg?react"

export default function GamePage() {
  const [init, setInit] = useState<Game | null>(null)

  if (!init) {
    return <JoinDialog setGame={setInit} />
  }

  return (
    <StompProvider>
      <GameSocketProvider gameId={init.id}>
        <GameView init={init} />
      </GameSocketProvider>
    </StompProvider>
  )
}

function GameView({ init }: { init: Game }) {
  const [game, setGame] = useState<Game>(init)
  const { connected, getClient } = useStompClient()
  const [finished, setFinished] = useState<boolean>(false)
  const { data: me } = useMeQuery()
  const { setStocks } = useStockStore.getState()

  useGameSocketEvent("GAME_UPDATED", (payload) => {
    const msg = payload as {
      purchases: Array<Purchase>
      players: Array<Player>
      serverTime: string
    }

    setStocks(msg.purchases)

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

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  return (
    <div className="flex h-full w-full justify-center gap-4">
      <FinishedDialog open={finished} players={game.players} />
      <div className="min-h-0 max-w-4xl min-w-0 flex-1">
        <GameSection game={game} />
      </div>
      <div className="hidden w-80 min-w-0 gap-4 md:flex md:flex-col">
        <Card size="sm" className="gap-2 rounded-xl">
          <div className="flex items-center gap-2">
            <Carrier className="size-6" />
            <span className="text-xl font-bold">개미 랭킹</span>
          </div>
          <PlayerTable players={game?.players ?? []} me={me?.player} />
        </Card>
        <div className="min-h-0 flex-1">
          <ChatBox gameId={game.id} />
        </div>
      </div>
    </div>
  )
}
