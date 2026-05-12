import { useGame } from "@/entities/game"
import { formatTimeToHMS } from "@/shared/lib/formatTime"
import { useEffect, useRef, useState } from "react"

export default function RemainingTime() {
  const { game } = useGame()

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

  return <>{formatTimeToHMS(remainingSeconds)}</>
}
