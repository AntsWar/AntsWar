import type { Money } from "@/shared/model/Money"

export type Purchase = {
  id: number
  meta: PurchaseMeta
  price: Money
}

export type PurchaseMeta = {
  code: string
  name: string
  type: PurchaseType
}

export type PurchaseType = "STOCK" | "CRYPTO" | "ALL"

export type TradeQuantity = number | "ALL"
