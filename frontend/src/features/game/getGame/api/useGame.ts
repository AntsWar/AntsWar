import type { Game, GameMeta } from "@/entities/game"
import { useCallback, useEffect, useRef, useState } from "react"
import { useGameSocket } from "./useGameSocket"
import type { Player } from "@/entities/player"
import type { Purchase } from "@/entities/purchase"

type GameStateOptions = {
  onGameReady?: () => void
  onGameStart?: () => void
  onPurchaseDelist?: (payload: { name: string }) => void
  onNotice?: (code: string) => void
}

export function useGame(
  roomId: string,
  options: GameStateOptions = {},
  initGame: Game
) {
  const [meta, setMeta] = useState<GameMeta>(initGame.meta)
  const [players, setPlayers] = useState<Array<Player>>(initGame.players)
  const [purchases, setPurchases] = useState<Array<Purchase>>(
    initGame.purchases
  )
  const [serverTime, setServerTime] = useState<number>(
    new Date(initGame.serverTime).getTime()
  )

  const disconnectRef = useRef<() => void>(null)
  const optionsRef = useRef(options)

  useEffect(() => {
    optionsRef.current = options
  }, [options])

  const handleSocketMessage = useCallback(
    (message: { type: string; payload: unknown }) => {
      switch (message.type) {
        case "GAME_READY": {
          optionsRef.current.onGameReady?.()
          break
        }
        case "GAME_STARTED": {
          optionsRef.current.onGameStart?.()
          break
        }
        case "ROOM_UPDATED": {
          const game = message.payload as Game
          setMeta(game.meta)
          setPlayers(game.players)
          setPurchases(game.purchases)
          setServerTime(new Date(game.serverTime).getTime())

          if (game.meta.status === "FINISHED") disconnectRef.current?.()
          break
        }
        case "PURCHASE_DELIST": {
          optionsRef.current.onPurchaseDelist?.(
            message.payload as { name: string }
          )
          break
        }
        case "NOTICE": {
          optionsRef.current.onNotice?.(message.payload as string)
        }
      }
    },
    []
  )

  const { disconnect } = useGameSocket({
    gameId: roomId,
    onMessage: handleSocketMessage,
  })

  useEffect(() => {
    disconnectRef.current = disconnect
  }, [disconnect])

  return { meta, players, purchases, serverTime }
}
