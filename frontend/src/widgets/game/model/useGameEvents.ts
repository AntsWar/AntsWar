import { useEffect } from "react"
import { useStompClient } from "@/shared/lib/stomp/StompProvider"
import { type Game, useGameTimeStore } from "@/entities/game"
import { useGameSocketEvent } from "@/features/game/socket"
import { useStockStore, type Purchase } from "@/entities/purchase"
import { type Player } from "@/entities/player"
import { NEWS_META, useNoticeStore } from "@/entities/news"
import { queryClient } from "@/shared/queries/queryClient"
import { qk } from "@/shared/queries/keys"

type Params = {
  setGame: React.Dispatch<React.SetStateAction<Game>>
  setFinished: React.Dispatch<React.SetStateAction<boolean>>
}

export function useGameEvents({ setGame, setFinished }: Params) {
  const { connected, getClient } = useStompClient()
  const { setStocks } = useStockStore.getState()

  useGameSocketEvent("GAME_UPDATED", (payload) => {
    const msg = payload as {
      purchases: Array<Purchase>
      players: Array<Player>
      serverTime: string
    }

    useGameTimeStore.getState().setSync(msg.serverTime)
    const elapsedSeconds = useGameTimeStore.getState().getElapsedSeconds()
    setStocks(msg.purchases, elapsedSeconds)

    setGame((prev) => ({
      ...prev,
      purchases: msg.purchases,
      players: msg.players,
      serverTime: msg.serverTime,
    }))
  })

  useGameSocketEvent("FINISHED", () => {
    setFinished(true)
  })

  useGameSocketEvent("NOTICE", (payload) => {
    const code = payload as string
    const message = NEWS_META[code] ?? code
    useNoticeStore.getState().setMessage(message, "news")
  })

  useGameSocketEvent("PURCHASE_DELIST", (payload) => {
    const { name } = payload as { name: string }
    useNoticeStore.getState().setMessage(`${name}(이)가 상폐되었습니다.`, "breaking")
    queryClient.invalidateQueries({ queryKey: qk.getMe() })
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
  }, [connected, getClient, setFinished])
}
