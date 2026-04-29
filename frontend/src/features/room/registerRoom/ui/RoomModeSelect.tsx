import { ButtonGroup } from "@/shared/ui/button-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { MONEY_OPTIONS, TIME_OPTIONS } from "../config"
import { formatTime } from "@/shared/lib/formatTime"
import type { RoomMode } from "../../../../entities/room/model/types"
import { Clock } from "lucide-react"

type ModeSelectProps = {
  mode: RoomMode
  onChange: (target: RoomMode) => void
}

export default function RoomModeSelect({ mode, onChange }: ModeSelectProps) {
  const handleModeChange = (nextName: "TIME" | "MONEY") => {
    if (nextName === "TIME") {
      onChange({
        type: "TIME",
        target: TIME_OPTIONS[0],
      })
      return
    }

    onChange({
      type: "MONEY",
      target: MONEY_OPTIONS[0],
    })
  }

  const handleValueChange = (rawValue: string) => {
    const nextValue = Number(rawValue)
    onChange({
      type: mode.type,
      target: nextValue,
    })
  }

  const currentOptions = mode.type === "TIME" ? TIME_OPTIONS : MONEY_OPTIONS

  return (
    <ButtonGroup>
      <Select
        value={mode.type}
        onValueChange={(v) => handleModeChange(v as "TIME" | "MONEY")}
      >
        <SelectTrigger className="min-w-24">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="min-w-0">
          <SelectItem value="TIME">
            <Clock className="text-primary" /> 시간 모드
          </SelectItem>
          {/* <SelectItem target="MONEY">목표 금액</SelectItem> */}
        </SelectContent>
      </Select>

      <Select value={String(mode.target)} onValueChange={handleValueChange}>
        <SelectTrigger className="min-w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="min-w-0">
          {currentOptions.map((option) => (
            <SelectItem key={option} value={String(option)}>
              {mode.type === "TIME"
                ? `${formatTime(option)}`
                : `${option.toLocaleString()}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </ButtonGroup>
  )
}
