import { api } from "@/shared/api"
import { API_PATH } from "@/shared/api/path"

export async function searchGame(name?: string) {
  const res = await api.get(API_PATH.SEARCH_GAME, {
    params: name ? { name } : undefined,
  })

  return res.data
}
