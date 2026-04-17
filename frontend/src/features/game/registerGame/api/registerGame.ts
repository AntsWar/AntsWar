import { API_PATH } from "@/shared/api/path"
import type { RegisterGameRequest } from "./types"
import { api } from "@/shared/api"

export async function registerGame(request: RegisterGameRequest) {
  const res = await api.post(API_PATH.REGISTER_GAME, request)

  return res.data
}
