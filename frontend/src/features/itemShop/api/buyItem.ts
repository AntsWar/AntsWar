import { api } from "@/shared/api"
import { API_PATH } from "@/shared/api/path"

export async function buyItem(item: string, code?: string) {
  const res = await api.post(`${API_PATH.PLAYER}/item`, {
    item: item,
    code: code,
  })

  return res.data
}
