import { api } from "@/shared/api"
import { API_PATH } from "@/shared/api/path"
import type { JoinRoomRequest, JoinRoomResponse } from "../model/types"

export async function joinRoom(
  roomId: string,
  request: JoinRoomRequest
): Promise<JoinRoomResponse> {
  const res = await api.post(`${API_PATH.ROOM(roomId)}/join`, request)

  return res.data
}
