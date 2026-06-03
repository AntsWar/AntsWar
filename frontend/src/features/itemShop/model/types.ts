import type { Money } from "@/shared/model/Money"
import type { LucideIcon } from "lucide-react"

export type ItemMeta = {
  code: string
  name: string
  icon: LucideIcon
  description: string
  price: Money
  onSuccess?: () => void
}
