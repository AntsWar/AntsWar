import { api } from "@/shared/api"
import { API_PATH } from "@/shared/api/path"

export async function earnByClick() {
  const res = await api.post(`${API_PATH.GAME}/earn/click`)

  return res.data
}
