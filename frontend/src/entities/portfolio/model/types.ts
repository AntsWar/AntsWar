import type { InstrumentType } from "@/entities/market/@x/portfolio"
import type { Money } from "@/shared/model/money"

export type Position = {
  name: string
  currentPrice: Money
  averagePrice: Money
  quantity: number
  instrumentType: InstrumentType
  positionType: PositionType
}

export type PositionType = "long" | "short"
