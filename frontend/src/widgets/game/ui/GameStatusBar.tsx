import { useGame } from "@/entities/game"
import { useMeQuery } from "@/features/getMe"
import { formatTimeToHMS } from "@/shared/lib/formatTime"
import { Money } from "@/shared/model/Money"
import { Banknote, Clock } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function GameStatusBar() {
  const { game } = useGame()
  const { data: me } = useMeQuery()

  const endedAt = game?.meta.endedAt
  const serverTime = game?.serverTime

  const [remainingSeconds, setRemainingSeconds] = useState<number>(0)

  const offsetRef = useRef(0)

  useEffect(() => {
    if (!serverTime) return
    offsetRef.current = new Date(serverTime).getTime() - Date.now()
  }, [serverTime])

  useEffect(() => {
    if (!endedAt) return

    const endedAtMs = new Date(endedAt).getTime()

    const update = () => {
      const expectedServerTime = Date.now() + offsetRef.current
      const next = Math.max(
        0,
        Math.floor((endedAtMs - expectedServerTime) / 1000)
      )

      setRemainingSeconds((prev) => (prev === next ? prev : next))
    }
    update()

    const timer = window.setInterval(update, 500)

    return () => window.clearInterval(timer)
  }, [endedAt])

  return (
    <div className="flex flex-row justify-between py-3">
      <div className="flex flex-row items-center gap-2 rounded-xl">
        <Clock className="size-5 text-secondary" />
        <div className="text-base text-muted-foreground">
          {formatTimeToHMS(remainingSeconds)}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Banknote className="text-secondary" />
        <Money money={me?.player.balance} />
      </div>
    </div>
  )
}
