import { api } from "@/shared/api"
import { API_PATH } from "@/shared/api/path"
import type { PositionType } from "@/entities/position"

export async function order(request: OrderRequest) {
  await api.post(`${API_PATH.GAME}/order`, request)
}

export type OrderRequest = {
  orderType: OrderType
  purchaseId: number
  positionType: PositionType
  quantity: number
}

export type OrderType = "BUY" | "SELL"
