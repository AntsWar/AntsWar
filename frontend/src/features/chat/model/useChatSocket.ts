import { useStompClient } from "@/shared/lib/stomp/StompProvider"
import { useEffect } from "react"
import { useChatStore } from "./chatStore"

// 여러 ChatBox가 동시에 마운트돼도 구독은 하나만 유지
let subscriberCount = 0

export function useChatSocket(gameId: number) {
  const { connected, getClient } = useStompClient()
  const messages = useChatStore((s) => s.messages)
  const add = useChatStore.getState().add

  useEffect(() => {
    if (!gameId || !connected) return
    if (subscriberCount > 0) {
      subscriberCount++
      return () => { subscriberCount-- }
    }

    const client = getClient()
    if (!client) return

    subscriberCount++
    const sub = client.subscribe(`/topic/game/${gameId}/chat`, ({ body }) => {
      try {
        const message = JSON.parse(body)
        add(message)
      } catch {
        /* empty */
      }
    })

    return () => {
      subscriberCount--
      if (subscriberCount === 0) sub.unsubscribe()
    }
  }, [connected, gameId, getClient, add])

  const send = (content: string) => {
    const client = getClient()
    if (!client?.connected) return
    client.publish({
      destination: `/app/chat/${gameId}`,
      body: JSON.stringify({ content }),
    })
  }

  return { messages, send }
}
