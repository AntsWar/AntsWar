import { useStompClient } from "@/shared/lib/stomp/StompProvider"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react"

type GameSocketMessage = {
  type: string
  payload: unknown
}

type GameSocketHandler = (payload: unknown) => void

type GameSocketContextValue = {
  subscribe: (type: string, handler: GameSocketHandler) => () => void
}

const GameSocketContext = createContext<GameSocketContextValue | null>(null)

function GameSocketProvider({
  gameId,
  children,
}: {
  gameId: number
  children: React.ReactNode
}) {
  const { connected, getClient } = useStompClient()

  const handlersRef = useRef(new Map<string, Set<GameSocketHandler>>())

  const subscribe = useCallback((type: string, handler: GameSocketHandler) => {
    const handlers = handlersRef.current

    if (!handlers.has(type)) {
      handlers.set(type, new Set())
    }

    handlers.get(type)!.add(handler)

    return () => {
      handlers.get(type)?.delete(handler)
    }
  }, [])

  useEffect(() => {
    if (!gameId || !connected) return

    const client = getClient()
    if (!client) return

    const sub = client.subscribe(`/topic/game/${gameId}`, (message) => {
      try {
        const { type, payload } = JSON.parse(message.body) as GameSocketMessage

        handlersRef.current.get(type)?.forEach((handler) => {
          handler(payload)
        })
      } catch (e) {
        console.error(e)
      }
    })

    return () => sub.unsubscribe()
  }, [connected, gameId, getClient])

  return (
    <GameSocketContext.Provider value={{ subscribe }}>
      {children}
    </GameSocketContext.Provider>
  )
}

function useGameSocketEvent(type: string, handler: GameSocketHandler) {
  const context = useContext(GameSocketContext)

  if (!context) {
    throw new Error("useGameSocketEvent must be used within GameSocketProvider")
  }

  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    return context.subscribe(type, (payload) => {
      handlerRef.current(payload)
    })
  }, [context, type])
}

// eslint-disable-next-line react-refresh/only-export-components
export { GameSocketProvider, useGameSocketEvent }
