import type { TradeQuantity } from "@/entities/purchase"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"

export function QuantitySelect(props: {
  value: TradeQuantity
  onValueChange: (quantity: TradeQuantity) => void
}) {
  const { value, onValueChange } = props

  const quantityOptions: Array<{ label: string; value: TradeQuantity }> = [
    { label: "1개", value: 1 },
    { label: "10개", value: 10 },
    { label: "50개", value: 50 },
    { label: "100개", value: 100 },
    { label: "전체", value: "ALL" },
  ]

  return (
    <Select
      value={String(value)}
      onValueChange={(value) =>
        onValueChange(value === "ALL" ? "ALL" : Number(value))
      }
    >
      <SelectTrigger className="min-w-20">
        <SelectValue placeholder="수량" />
      </SelectTrigger>

      <SelectContent className="min-w-0">
        {quantityOptions.map((option) => (
          <SelectItem key={String(option.value)} value={String(option.value)}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
