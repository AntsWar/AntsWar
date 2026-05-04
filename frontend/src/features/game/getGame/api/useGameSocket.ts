import { useCallback, useEffect, useRef } from "react"
import { Client, type IMessage } from "@stomp/stompjs"

type GameSocketMessage = {
  type: string
  payload: unknown
}
const MAX_RECONNECT_ATTEMPTS = 3
const RECONNECT_DELAY_MS = 5000
const CONNECTION_TIMEOUT_MS = 4000

export function useGameSocket({
  id,
  onMessage,
}: {
  id: number
  onMessage: (message: GameSocketMessage) => void
}) {
  const clientRef = useRef<Client | null>(null)
  const reconnectFailCountRef = useRef(0)
  const onMessageRef = useRef(onMessage)

  useEffect(() => {
    onMessageRef.current = onMessage
  }, [onMessage])

  const disconnect = useCallback(async () => {
    const client = clientRef.current
    if (!client) return

    client.reconnectDelay = 0
    await client.deactivate()

    if (clientRef.current === client) {
      clientRef.current = null
    }
  }, [])

  useEffect(() => {
    reconnectFailCountRef.current = 0
    let closedByCleanup = false

    const client = new Client({
      brokerURL: `ws://${window.location.host}/api/ws`,
      reconnectDelay: RECONNECT_DELAY_MS,
      connectionTimeout: CONNECTION_TIMEOUT_MS,

      onConnect: () => {
        reconnectFailCountRef.current = 0
        client.subscribe(`/topic/game/${id}`, (message: IMessage) => {
          try {
            const parsed = JSON.parse(message.body) as GameSocketMessage
            onMessageRef.current(parsed)
          } catch (error) {
            console.error("게임 소켓 메시지 파싱 실패", error)
          }
        })
      },

      onWebSocketClose: () => {
        if (closedByCleanup) return

        reconnectFailCountRef.current += 1

        if (reconnectFailCountRef.current >= MAX_RECONNECT_ATTEMPTS) {
          console.error("최대 재연결 횟수 초과. 재연결 중단")
          client.reconnectDelay = 0
          client.deactivate()
        }
      },
    })

    clientRef.current = client
    client.activate()

    return () => {
      closedByCleanup = true
      client.reconnectDelay = 0
      client.deactivate()

      if (clientRef.current === client) {
        clientRef.current = null
      }
    }
  }, [id])

  return { disconnect }
}
