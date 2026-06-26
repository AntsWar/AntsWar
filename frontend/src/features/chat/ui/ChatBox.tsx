import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { useLayoutEffect, useRef, useState } from "react"
import Chat from "@/assets/icon/chat.svg?react"
import { HorizonCard } from "@/shared/ui/card"
import Send from "@/assets/icon/send.svg?react"
import { useChatSocket } from "../model/useChatSocket"

export default function ChatBox({ gameId }: { gameId: number }) {
  const { messages, send } = useChatSocket(gameId)
  const [text, setText] = useState("")

  const containerRef = useRef<HTMLDivElement | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const shouldScrollRef = useRef(true)

  const handleScroll = () => {
    const el = containerRef.current
    if (!el) return
    shouldScrollRef.current =
      el.scrollHeight - el.scrollTop - el.clientHeight < 80
  }

  useLayoutEffect(() => {
    if (!shouldScrollRef.current) return
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages])

  const handleSend = () => {
    const content = text.trim()
    if (!content) return
    send(content)
    setText("")
  }

  return (
    <HorizonCard
      className="h-full rounded-xl"
      contentClassName="flex h-full min-h-0 min-w-0 flex-col"
    >
      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-2">
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2 text-xl font-bold">
            <Chat className="shrink-0" />
            <span>전략실</span>
          </div>
          <Button className="px-2 py-1" size="xs">
            닫기
          </Button>
        </div>

        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto"
        >
          <div className="min-w-0 space-y-1">
            {messages.map((m, i) => (
              <p key={i} className="wrap-break-word whitespace-normal">
                <b>{m.name}</b>: {m.content}
              </p>
            ))}
            <div ref={bottomRef} />
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex min-w-0 gap-2"
        >
          <Input
            className="min-w-0 flex-1"
            value={text}
            maxLength={50}
            placeholder="메시지 보내기"
            onChange={(e) => setText(e.target.value)}
          />
          <Button size="xs">
            <Send className="size-6" />
          </Button>
        </form>
      </div>
    </HorizonCard>
  )
}
