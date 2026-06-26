import { useStompClient } from "@/shared/lib/stomp/StompProvider"
import { useEffect, useState } from "react"

type ChatMessage = {
  name: string
  content: string
}

export function useChatSocket(gameId: number) {
  const { connected, getClient } = useStompClient()
  const [messages, setMessages] = useState<Array<ChatMessage>>([])

  useEffect(() => {
    if (!gameId || !connected) return

    const client = getClient()
    if (!client) return

    const sub = client.subscribe(`/topic/game/${gameId}/chat`, ({ body }) => {
      try {
        const message = JSON.parse(body) as ChatMessage
        setMessages((prev) => [...prev, message])
      } catch {
        /* empty */
      }
    })

    return () => sub.unsubscribe()
  }, [connected, gameId, getClient])

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
