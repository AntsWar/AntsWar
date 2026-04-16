import { type GameMode, type MoneyValue, type TimeValue } from "../model/types"
import { formatMoney } from "@/shared/lib/formatMoney"
import { ButtonGroup } from "@/shared/ui/button-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { MONEY_OPTIONS, TIME_OPTIONS } from "../config"

type GameModeSelectProps = {
  mode: GameMode
  onChange: (target: GameMode) => void
}

export default function GameModeSelect({
  mode,
  onChange,
}: GameModeSelectProps) {
  const handleModeChange = (nextName: "time" | "money") => {
    if (nextName === "time") {
      onChange({
        type: "time",
        target: TIME_OPTIONS[0],
      })
      return
    }

    onChange({
      type: "money",
      target: MONEY_OPTIONS[0],
    })
  }

  const handleValueChange = (rawValue: string) => {
    const nextValue = Number(rawValue)

    if (mode.type === "time") {
      onChange({
        type: "time",
        target: nextValue as TimeValue,
      })
      return
    }

    onChange({
      type: "money",
      target: nextValue as MoneyValue,
    })
  }

  const currentOptions = mode.type === "time" ? TIME_OPTIONS : MONEY_OPTIONS

  return (
    <ButtonGroup>
      <Select
        value={mode.type}
        onValueChange={(v) => handleModeChange(v as "time" | "money")}
      >
        <SelectTrigger className="min-w-24">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="min-w-0">
          <SelectItem value="time">시간 모드</SelectItem>
          {/* <SelectItem target="money">목표 금액</SelectItem> */}
        </SelectContent>
      </Select>

      <Select value={String(mode.target)} onValueChange={handleValueChange}>
        <SelectTrigger className="min-w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="min-w-0">
          {currentOptions.map((option) => (
            <SelectItem key={option} value={String(option)}>
              {mode.type === "time"
                ? `${option}분`
                : `${formatMoney(option)} 만원`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </ButtonGroup>
  )
}
