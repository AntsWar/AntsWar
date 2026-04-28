import { api } from "@/shared/api"
import { API_PATH } from "@/shared/api/path"
import type { JoinRoomRequest, JoinRoomResponse } from "../model/types"
import { getGuestName } from "@/shared/lib/guestStorage"

export async function joinRoom(
  roomId: string,
  request: JoinRoomRequest
): Promise<JoinRoomResponse> {
  const res = await api.post(`${API_PATH.ROOM(roomId)}/join`, {
    ...request,
    playerName: getGuestName(),
  })

  return res.data
}
