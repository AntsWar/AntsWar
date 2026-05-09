import { api } from "@/shared/api"
import { API_PATH } from "@/shared/api/path"

export async function buyFakeNewsItem(code: string) {
  const res = await api.post(`${API_PATH.PLAYER}/item/fake-news`, {
    code: code,
  })

  return res.data
}
