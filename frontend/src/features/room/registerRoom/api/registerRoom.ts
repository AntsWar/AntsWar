import { API_PATH } from "@/shared/api/path"
import { api } from "@/shared/api"
import type { RoomMode } from "@/entities/room"

export async function registerRoom(request: RegisterRoomRequest) {
  const res = await api.post(API_PATH.ROOM_BASE, request)

  return res.data
}

export type RegisterRoomRequest = {
  name: string
  password: string
  capacity: number
  mode: RoomMode
}
