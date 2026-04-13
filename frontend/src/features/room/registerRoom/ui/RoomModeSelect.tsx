import {
  MONEY_OPTIONS,
  TIME_OPTIONS,
  type MoneyValue,
  type RoomMode,
  type TimeValue,
} from "@/entities/room"
import { ButtonGroup } from "@/shared/ui/button-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"

export default function RoomModeSelect({
  mode,
  onChange,
}: {
  mode: RoomMode
  onChange: (value: RoomMode) => void
}) {
  const handleModeChange = (nextName: "시간모드" | "금액모드") => {
    if (nextName === "시간모드") {
      onChange({
        name: "시간모드",
        value: TIME_OPTIONS[0],
      })
      return
    }

    onChange({
      name: "금액모드",
      value: MONEY_OPTIONS[0],
    })
  }

  const handleValueChange = (rawValue: string) => {
    const nextValue = Number(rawValue)

    if (mode.name === "시간모드") {
      onChange({
        name: "시간모드",
        value: nextValue as TimeValue,
      })
      return
    }

    onChange({
      name: "금액모드",
      value: nextValue as MoneyValue,
    })
  }

  const currentOptions = mode.name === "시간모드" ? TIME_OPTIONS : MONEY_OPTIONS

  return (
    <ButtonGroup>
      <Select
        value={mode.name}
        onValueChange={(v) => handleModeChange(v as "시간모드" | "금액모드")}
      >
        <SelectTrigger className="min-w-24">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="min-w-0">
          <SelectItem value="시간모드">시간 모드</SelectItem>
          {/* <SelectItem value="money">목표 금액</SelectItem> */}
        </SelectContent>
      </Select>

      <Select value={String(mode.value)} onValueChange={handleValueChange}>
        <SelectTrigger className="min-w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="min-w-0">
          {currentOptions.map((option) => (
            <SelectItem key={option} value={String(option)}>
              {mode.name === "시간모드"
                ? `${option}분`
                : `${option.toLocaleString()} 만원`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </ButtonGroup>
  )
}
