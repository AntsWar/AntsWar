import { api } from "@/shared/api"
import { API_PATH } from "@/shared/api/path"

export async function earnByClick(gameId: string) {
  const res = await api.post(`${API_PATH.GAME(gameId)}/earn/click`)

  return res.data
}
