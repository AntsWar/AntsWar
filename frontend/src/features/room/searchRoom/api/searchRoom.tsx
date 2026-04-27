import { api } from "@/shared/api"
import { API_PATH } from "@/shared/api/path"

export async function searchRoom(name?: string) {
  const res = await api.get(`${API_PATH.ROOM_BASE}/search`, {
    params: name ? { name } : undefined,
  })

  return res.data
}
