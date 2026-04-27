import { qk } from "@/shared/quries/keys"
import { useQuery } from "@tanstack/react-query"
import { getMe } from "./getMe"

export function useMeQuery(roomId: string) {
  return useQuery({
    queryKey: qk.getMe(roomId),
    queryFn: () => getMe({ gameId: roomId }),
  })
}
