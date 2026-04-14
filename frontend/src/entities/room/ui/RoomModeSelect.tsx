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
  const handleModeChange = (nextName: "timeMode" | "moneyMode") => {
    if (nextName === "timeMode") {
      onChange({
        name: "timeMode",
        target: TIME_OPTIONS[0],
      })
      return
    }

    onChange({
      name: "moneyMode",
      target: MONEY_OPTIONS[0],
    })
  }

  const handleValueChange = (rawValue: string) => {
    const nextValue = Number(rawValue)

    if (mode.name === "timeMode") {
      onChange({
        name: "timeMode",
        target: nextValue as TimeValue,
      })
      return
    }

    onChange({
      name: "moneyMode",
      target: nextValue as MoneyValue,
    })
  }

  const currentOptions = mode.name === "timeMode" ? TIME_OPTIONS : MONEY_OPTIONS

  return (
    <ButtonGroup>
      <Select
        value={mode.name}
        onValueChange={(v) => handleModeChange(v as "timeMode" | "moneyMode")}
      >
        <SelectTrigger className="min-w-24">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="min-w-0">
          <SelectItem value="timeMode">시간 모드</SelectItem>
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
              {mode.name === "timeMode"
                ? `${option}분`
                : `${formatMoney(option)} 만원`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </ButtonGroup>
  )
}
