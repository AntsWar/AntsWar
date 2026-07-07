import type { Money } from "@/shared/model/Money"

export type PricePoint = {
  price: number
  gameTime: number
}

export type Purchase = {
  id: number
  meta: PurchaseMeta
  price: Money
  priceHistory: PricePoint[]
}

export type PurchaseMeta = {
  code: string
  name: string
  type: PurchaseType
}

export type PurchaseType = "STOCK" | "CRYPTO" | "ALL"

export type TradeQuantity = number | "ALL"
