import type { PurchaseMeta } from "@/entities/purchase/@x/position"
import type { Money } from "@/shared/model/Money"

export type Position = {
  id: number
  meta: PurchaseMeta
  quantity: number
  type: PositionType
  averagePrice: Money
  profit?: Money
}

export type PositionType = "LONG" | "SHORT"
