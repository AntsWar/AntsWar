import type { GameMeta } from "@/entities/game"
import { formatTimeToHMS } from "@/shared/lib/formatTime"
import { Money } from "@/shared/model/Money"
import { Banknote, Clock } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function GameStatusBar(props: {
  meta: GameMeta
  serverTime: string
  balance: Money
}) {
  const { meta, serverTime, balance } = props
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0)

  const offsetRef = useRef(0)
  const endedAtRef = useRef(new Date(meta.endedAt).getTime())

  useEffect(() => {
    offsetRef.current = new Date(serverTime).getTime() - Date.now()
  }, [serverTime])

  useEffect(() => {
    const update = () => {
      const expectedServerTime = Date.now() + offsetRef.current

      const next = Math.max(
        0,
        Math.floor((endedAtRef.current - expectedServerTime) / 1000)
      )

      setRemainingSeconds((prev) => (prev === next ? prev : next))
    }

    update()

    const timer = window.setInterval(update, 500)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="sticky top-0 z-10 bg-background py-2">
      <div className="flex flex-row items-start justify-between">
        <div className="flex flex-row items-center gap-2 rounded-xl">
          <Clock className="size-5 text-secondary" />
          <div className="text-base text-muted-foreground">
            {formatTimeToHMS(remainingSeconds)}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Banknote className="text-secondary" />
          <Money money={balance} />
        </div>
      </div>
    </div>
  )
}
