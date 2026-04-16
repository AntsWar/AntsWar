import type { Money } from "@/shared/model/money"

export type Purchase = {
  meta: PurchaseMeta
  price: Money
}

export type PurchaseMeta = {
  id: number
  name: string
  type: PurchaseType
}

export type PurchaseType = "stock" | "crypto"
