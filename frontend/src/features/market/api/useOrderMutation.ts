import { qk } from "@/shared/quries/keys"
import { useMutation } from "@tanstack/react-query"
import { order, type OrderRequest } from "./order"
import { queryClient } from "@/shared/quries/queryClient"

export function useOrderMutation() {
  return useMutation({
    mutationKey: qk.order(),
    mutationFn: (request: OrderRequest) => order(request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: qk.getMe(),
      })
    },
  })
}
