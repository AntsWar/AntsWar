import { api } from "@/shared/api"
import { API_PATH } from "@/shared/api/path"

export async function sellPurchase(request: SellPurchaseRequest) {
  await api.post(`${API_PATH.PLAYER}/purchase/sell`, request)
}

export type SellPurchaseRequest = {
  positionId: number
  quantity: number
}
