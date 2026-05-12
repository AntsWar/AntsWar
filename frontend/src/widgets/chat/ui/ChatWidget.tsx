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

export function ChatWidget({ gameId }: { gameId: number }) {
  const { connected, getClient } = useStompClient()

  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Array<ChatSocketMessage>>([])
  const [text, setText] = useState("")

  useEffect(() => {
    if (!gameId || !connected) return

    const client = getClient()
    if (!client) return

    const sub = client.subscribe(`/topic/game/${gameId}/chat`, ({ body }) => {
      try {
        const message = JSON.parse(body) as ChatSocketMessage
        setMessages((prev) => [...prev, message])
      } catch {
        // ignore
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
      destination: `/app/game/${gameId}/chat`,
      body: JSON.stringify({ content }),
    })

    setText("")
  }

  return (
    <>
      {/* desktop */}
      <div className="hidden justify-start lg:block">
        <div className="mx-3 h-full">
          <ChatPanel
            messages={messages}
            text={text}
            onTextChange={setText}
            onSend={send}
          />
        </div>
      </div>

      {/* mobile launcher */}
      {!open && (
        <button
          className="fixed right-4 bottom-4 left-4 z-40 flex h-14 items-center justify-between rounded-2xl border bg-popover px-4 shadow-lg lg:hidden"
          onClick={() => setOpen(true)}
        >
          <span className="flex items-center gap-2 font-semibold">
            <MessageCircle className="text-secondary" />
            채팅
          </span>
          <span className="text-muted-foreground">열기</span>
        </button>
      )}

      {/* mobile sheet */}
      {open && (
        <div className="fixed right-0 bottom-0 left-0 z-50 h-[72vh] rounded-t-2xl border bg-popover p-3 shadow-2xl lg:hidden">
          <div className="mb-2 flex items-center justify-between px-1">
            <div className="flex items-center gap-2 font-semibold">
              <MessageCircle className="text-secondary" />
              채팅
            </div>

            <Button size="icon" variant="ghost" onClick={() => setOpen(false)}>
              <X />
            </Button>
          </div>

          <ChatPanel
            messages={messages}
            text={text}
            onTextChange={setText}
            onSend={send}
            mobile
          />
        </div>
      )}
    </>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
function ChatPanel({
  messages,
  text,
  onTextChange,
  onSend,
  mobile = false,
}: {
  messages: Array<ChatSocketMessage>
  text: string
  onTextChange: (value: string) => void
  onSend: () => void
  mobile?: boolean
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80

    if (isNearBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  return (
    <Field
      className={
        mobile
          ? "flex h-[calc(72vh-56px)] w-full flex-col gap-3 border-0 bg-transparent p-0"
          : "flex h-full w-80 flex-col gap-5 rounded-xl border bg-popover p-4"
      }
    >
      {!mobile && (
        <FieldLabel className="text-xl">
          <MessageCircle className="text-secondary" /> 채팅
        </FieldLabel>
      )}

      <div
        ref={containerRef}
        className="no-scrollbar min-h-0 flex-1 space-y-1 overflow-y-auto"
      >
        {messages.map((m, i) => (
          <div key={i} className="text-sm">
            <b>{m.name}</b>: {m.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2">
        <Input
          value={text}
          maxLength={50}
          placeholder="메시지 보내기"
          onChange={(e) => onTextChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSend()
          }}
        />
        <Button onClick={onSend}>
          <Send />
        </Button>
      </div>
    </Field>
  )
}
