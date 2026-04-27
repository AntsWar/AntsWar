import type { Money } from "@/shared/model/Money"

export type Purchase = {
  meta: PurchaseMeta
  price: Money
}

export type PurchaseMeta = {
  code: string
  name: string
  type: PurchaseType
}

export type PurchaseType = "STOCK" | "CRYPTO"

export type TradeQuantity = number | "ALL"
