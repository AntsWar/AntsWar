import { api } from "@/shared/api"
import { API_PATH } from "@/shared/api/path"
import type { Me } from "../model/types"

export async function getMe() {
  const res = await api.get(`${API_PATH.GAME}/me`)

  return res.data as Me
}
