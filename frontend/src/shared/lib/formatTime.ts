export function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours > 0) {
    if (minutes === 0) return `${hours}시간`
    return `${hours}시간 ${minutes}분`
  }
  return `${minutes}분`
}

export function formatTimeToHMS(seconds: number) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  return `${h.toString().padStart(2, "0")}:${m
    .toString()
    .padStart(2, "0")}:${s.toString().padStart(2, "0")}`
}

export function formatTimeToMS(seconds: number) {
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
}
