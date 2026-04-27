import { qk } from "@/shared/quries/keys"
import { useMutation } from "@tanstack/react-query"
import type { JoinRoomRequest } from "../model/types"
import { joinRoom } from "./JoinRoom"

export function useJoinRoomMutation(roomId: string) {
  return useMutation({
    mutationKey: qk.joinRoom(roomId),
    mutationFn: (request: JoinRoomRequest) => joinRoom(roomId, request),
  })
}
