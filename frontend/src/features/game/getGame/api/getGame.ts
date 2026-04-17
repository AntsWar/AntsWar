import { api } from "@/shared/api"
import { API_PATH } from "@/shared/api/path"

export async function getGame(params: { gameId: string }) {
  const { gameId } = params
  const res = await api.get(`${API_PATH.GET_GAME}/${gameId}`)

  return res.data
}
