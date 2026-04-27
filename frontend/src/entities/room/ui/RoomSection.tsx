import { formatTime } from "@/shared/lib/formatTime"
import type { RoomMode } from "../model/types"

export default function RoomSection(props: { name: string; mode: RoomMode }) {
  const { name, mode } = props
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row gap-2">
        <div>{name}</div>
        <div>
          ({mode.type === "TIME" ? "시간모드" : "돈모드"}
          {" | "}
          {mode.type === "TIME" && formatTime(mode.target)})
        </div>
      </div>
    </div>
  )
}
