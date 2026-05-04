import type { Game, GameMeta } from "@/entities/game"
import { useCallback, useEffect, useRef, useState } from "react"
import { useGameSocket } from "./useGameSocket"
import type { Player } from "@/entities/player"
import type { Purchase } from "@/entities/purchase"

type GameStateOptions = {
  onPurchaseDelist?: (payload: { name: string }) => void
  onNotice?: (code: string) => void
}

export function useGame(initGame: Game, options: GameStateOptions = {}) {
  const [id] = useState<number>(initGame.id)
  const [meta, setMeta] = useState<GameMeta>(initGame.meta)
  const [players, setPlayers] = useState<Array<Player>>(initGame.players)
  const [purchases, setPurchases] = useState<Array<Purchase>>(
    initGame.purchases
  )
  const [serverTime, setServerTime] = useState<string>(initGame.serverTime)

  const disconnectRef = useRef<() => void>(null)
  const optionsRef = useRef(options)

  useEffect(() => {
    optionsRef.current = options
  }, [options])

  const handleSocketMessage = useCallback(
    (message: { type: string; payload: unknown }) => {
      switch (message.type) {
        case "GAME_UPDATED": {
          const game = message.payload as Game
          setMeta(game.meta)
          setPlayers(game.players)
          setPurchases(game.purchases)
          setServerTime(game.serverTime)
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
    id: id,
    onMessage: handleSocketMessage,
  })

  useEffect(() => {
    disconnectRef.current = disconnect
  }, [disconnect])

  return { meta, players, purchases, serverTime }
}
