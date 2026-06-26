import { qk } from "@/shared/queries/keys"
import { useMutation } from "@tanstack/react-query"
import { joinGame } from "./joinGame"

export function useJoinGameMutation() {
  return useMutation({
    mutationKey: qk.joinGame(),
    mutationFn: (playerName: string) => joinGame(playerName),
  })
}
