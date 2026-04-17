import type { PurchaseMeta } from "@/entities/market/@x/portfolio"
import type { Money } from "@/shared/model/money"

export type Portfolio = {
  longPositions: Array<Position>
  shortPositions: Array<Position>
}

export type Position = {
  meta: PurchaseMeta
  quantity: number
  type: PositionType
  averagePrice: Money
}

export type PositionType = "LONG" | "SHORT"
