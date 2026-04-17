import { api } from "@/shared/api"
import { API_PATH } from "@/shared/api/path"

export async function joinGame(params: {
  gameId: string
  request: JoinGameRequest
}) {
  const { gameId, request } = params
  const res = await api.post(API_PATH.JOIN_GAME(gameId), request)

  return res.data
}

export type JoinGameRequest = {
  password?: string
}
