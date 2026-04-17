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

    if (mode.type === "TIME") {
      onChange({
        type: "TIME",
        target: nextValue as TimeValue,
      })
      return
    }

    onChange({
      type: "MONEY",
      target: nextValue as MoneyValue,
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
          <SelectItem value="TIME">시간 모드</SelectItem>
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
                ? `${option}분`
                : `${formatMoney(option)} 만원`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </ButtonGroup>
  )
}
