import type { Game } from "@/entities/game"
import type { Player } from "@/entities/player"
import { api } from "@/shared/api"
import { API_PATH } from "@/shared/api/path"

export async function joinGame(playerName: string): Promise<JoinGameResponse> {
  const res = await api.post(`${API_PATH.GAME}/join`, {
    playerName: playerName,
  })

  return res.data
}

export type JoinGameResponse = {
  game: Game
  player: Player
}
