import { api } from "@/shared/api"
import { API_PATH } from "@/shared/api/path"

export async function startGame(gameId: string) {
  await api.post(`${API_PATH.ROOM(gameId)}/start`)
}
