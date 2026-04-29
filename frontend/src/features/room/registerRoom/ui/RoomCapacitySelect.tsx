import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import type { SelectProps } from "@radix-ui/react-select"
import { Users } from "lucide-react"

export default function RoomCapacitySelect({ ...props }: SelectProps) {
  const capacities = Array.from({ length: 10 }, (_, i) => i + 1)

  return (
    <Select {...props}>
      <SelectTrigger className="w-24!">
        <Users className="text-primary" />
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
