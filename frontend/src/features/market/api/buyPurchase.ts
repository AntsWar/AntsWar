import { api } from "@/shared/api"
import { API_PATH } from "@/shared/api/path"
import type { PositionType } from "@/entities/position"

export async function buyPurchase(request: BuyPurchaseRequest) {
  await api.post(`${API_PATH.PLAYER}/purchase/buy`, request)
}

export type BuyPurchaseRequest = {
  purchaseId: number
  positionType: PositionType
  quantity: number
}
