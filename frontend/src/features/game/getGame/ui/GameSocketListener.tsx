import { useStompClient } from "@/shared/lib/stomp/StompProvider"
import { useGame } from "@/entities/game"
import { useEffect } from "react"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { qk } from "@/shared/quries/keys"
import type { Purchase } from "@/entities/purchase"
import type { Player } from "@/entities/player"
import type { Me } from "@/features/getMe"
import { NEWS_META } from "@/entities/news"

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
            setGame((prev) => {
              if (!prev) return prev

              const msg = payload as {
                purchases: Array<Purchase>
                players: Array<Player>
                serverTime: string
              }

              return {
                ...prev,
                purchases: msg.purchases,
                players: msg.players,
                serverTime: msg.serverTime,
              }
            })
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
            const me = queryClient.getQueryData<Me>(qk.getMe())
            const noticeRate = me?.noticeRate ?? 0.3

            if (Math.random() < noticeRate) {
              const code = payload as string

              const message = NEWS_META[code] ?? code

              toast.info(message)
            }

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
