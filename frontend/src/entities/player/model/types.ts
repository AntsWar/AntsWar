import type { Money } from "@/shared/model/money"

export type Player = {
  id: number
  name: string
  balance: Money
}
