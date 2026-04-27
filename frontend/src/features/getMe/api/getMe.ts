import { api } from "@/shared/api"
import { API_PATH } from "@/shared/api/path"
import type { Me } from "../model/types"

export async function getMe(params: { gameId: string }) {
  const { gameId } = params
  const res = await api.get(`${API_PATH.GAME(gameId)}/me`)

  return res.data as Me
}
