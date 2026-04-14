import {
  MONEY_OPTIONS,
  TIME_OPTIONS,
  type MoneyValue,
  type RoomMode,
  type TimeValue,
} from "@/entities/room"
import { formatMoney } from "@/shared/lib/formatMoney"
import { ButtonGroup } from "@/shared/ui/button-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"

type RoomModeSelectProps = {
  mode: RoomMode
  onChange: (target: RoomMode) => void
}

export default function RoomModeSelect({
  mode,
  onChange,
}: RoomModeSelectProps) {
  const handleModeChange = (nextName: "time" | "money") => {
    if (nextName === "time") {
      onChange({
        name: "time",
        target: TIME_OPTIONS[0],
      })
      return
    }

    onChange({
      name: "money",
      target: MONEY_OPTIONS[0],
    })
  }

  const handleValueChange = (rawValue: string) => {
    const nextValue = Number(rawValue)

    if (mode.name === "time") {
      onChange({
        name: "time",
        target: nextValue as TimeValue,
      })
      return
    }

    onChange({
      name: "money",
      target: nextValue as MoneyValue,
    })
  }

  const currentOptions = mode.name === "time" ? TIME_OPTIONS : MONEY_OPTIONS

  return (
    <ButtonGroup>
      <Select
        value={mode.name}
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
              {mode.name === "time"
                ? `${option}분`
                : `${formatMoney(option)} 만원`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </ButtonGroup>
  )
}
