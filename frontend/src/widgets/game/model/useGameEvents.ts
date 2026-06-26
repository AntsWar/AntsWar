import { useEffect } from "react"
import { useStompClient } from "@/shared/lib/stomp/StompProvider"
import { type Game } from "@/entities/game"
import { useGameSocketEvent } from "@/features/game/socket"
import { useStockStore, type Purchase } from "@/entities/purchase"
import { type Player } from "@/entities/player"
import { NEWS_META, useNoticeStore } from "@/entities/news"
import { toast } from "sonner"
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

    setStocks(msg.purchases)

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
