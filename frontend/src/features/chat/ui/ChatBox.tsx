import { useStompClient } from "@/shared/lib/stomp/StompProvider"
import { Button } from "@/shared/ui/button"
import { Field, FieldLabel } from "@/shared/ui/field"
import { Input } from "@/shared/ui/input"
import { MessageCircle, Send, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

type ChatSocketMessage = {
  name: string
  content: string
}

export default function ChatBox({
  gameId,
  onClose,
}: {
  gameId: number
  onClose: () => void
}) {
  const { connected, getClient } = useStompClient()

  const [messages, setMessages] = useState<Array<ChatSocketMessage>>([])
  const [text, setText] = useState("")

  const containerRef = useRef<HTMLDivElement | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  // 자동 스크롤
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80

    if (isNearBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // 소켓 구독
  useEffect(() => {
    if (!gameId || !connected) return

    const client = getClient()
    if (!client) return

    const sub = client.subscribe(`/topic/game/${gameId}/chat`, ({ body }) => {
      try {
        const message = JSON.parse(body) as ChatSocketMessage
        setMessages((prev) => [...prev, message])
      } catch {
        /* empty */
      }
    })

    return () => sub.unsubscribe()
  }, [connected, gameId, getClient])

  const send = () => {
    const content = text.trim()
    if (!content) return

    const client = getClient()
    if (!client?.connected) return

    client.publish({
      destination: `/app/chat/${gameId}`,
      body: JSON.stringify({ content }),
    })

    setText("")
  }

  return (
    <Field className="flex h-full min-h-0 flex-col gap-5 rounded-xl border bg-popover p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
      <FieldLabel className="shrink-0 justify-between">
        <div className="flex gap-2 text-xl">
          <MessageCircle className="text-secondary" /> 채팅
        </div>
        <Button variant={"ghost"} onClick={onClose}>
          <X />
        </Button>
      </FieldLabel>

      <div
        ref={containerRef}
        className="no-scrollbar min-h-0 flex-1 space-y-1 overflow-y-auto"
      >
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.name}</b>: {m.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          send()
        }}
        className="flex shrink-0 gap-2 pb-[env(safe-area-inset-bottom)]"
      >
        <Input
          value={text}
          maxLength={50}
          placeholder="메시지 보내기"
          onChange={(e) => setText(e.target.value)}
        />
        <Button>
          <Send />
        </Button>
      </form>
    </Field>
  )
}
