import { qk } from "@/shared/quries/keys"
import { useMutation } from "@tanstack/react-query"
import { order, type OrderRequest } from "./order"
import { queryClient } from "@/shared/quries/queryClient"

export function useOrderMutation(gameId: string) {
  return useMutation({
    mutationKey: qk.order(gameId),
    mutationFn: (request: OrderRequest) => order(gameId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: qk.getMe(gameId),
      })
    },
  })
}
