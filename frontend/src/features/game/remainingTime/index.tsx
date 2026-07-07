import { formatTimeToMS } from "@/shared/lib/formatTime"
import { useEffect, useState } from "react"
import { useGameTimeStore } from "@/entities/game"

export default function RemainingTime() {
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0)
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0)
  const endedAtMs = useGameTimeStore((s) => s.endedAtMs)

  useEffect(() => {
    if (!endedAtMs) return

    const update = () => {
      const { getGameTime, getElapsedSeconds } = useGameTimeStore.getState()
      const gameNow = getGameTime()
      const next = Math.max(0, Math.floor((endedAtMs - gameNow) / 1000))
      setRemainingSeconds((prev) => (prev === next ? prev : next))
      setElapsedSeconds(getElapsedSeconds())
    }
    update()

    const timer = window.setInterval(update, 500)
    return () => window.clearInterval(timer)
  }, [endedAtMs])

  return (
    <div className="flex items-center gap-2">
      <span className="text-xl font-bold">
        {formatTimeToMS(elapsedSeconds)}
      </span>
      <span className="text-md">({formatTimeToMS(remainingSeconds)})</span>
    </div>
  )
}
