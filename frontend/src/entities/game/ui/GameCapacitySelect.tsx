import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import type { SelectProps } from "@radix-ui/react-select"

export default function GameCapacitySelect({ ...props }: SelectProps) {
  const capacities = Array.from({ length: 10 }, (_, i) => i + 1)

  return (
    <Select {...props}>
      <SelectTrigger className="max-w-24 min-w-24">
        <SelectValue placeholder="인원 수" />
      </SelectTrigger>
      <SelectContent className="min-w-0">
        {capacities.map((n) => (
          <SelectItem key={n} value={String(n)}>
            {n} 명
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
