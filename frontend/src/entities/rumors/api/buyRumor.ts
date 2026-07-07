import { api } from "@/shared/api"
import { API_PATH } from "@/shared/api/path"
import type { RumorType } from "../model/types"

export async function buyRumor(
  type: RumorType,
  category: string
): Promise<BuyRumorResult> {
  const res = await api.post(`${API_PATH.PLAYER}/item/rumor`, {
    item: type,
    category,
  })
  return res.data as BuyRumorResult
}

type BuyRumorResult = {
  content: string
  type: RumorType
}
