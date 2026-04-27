import type { Player } from "@/entities/player"
import type { Position } from "@/entities/position"
import { api } from "@/shared/api"
import { API_PATH } from "@/shared/api/path"

export async function getMe(params: { gameId: string }) {
  const { gameId } = params
  const res = await api.get(`${API_PATH.GAME(gameId)}/me`)

  return res.data as GetMeResponse
}

export type GetMeResponse = {
  player: Player
  positions: Array<Position>
}
