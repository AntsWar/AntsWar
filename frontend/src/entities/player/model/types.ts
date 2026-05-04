import type { Money } from "@/shared/model/Money"

export type Player = {
  id: number
  name: string
  balance: Money
}
