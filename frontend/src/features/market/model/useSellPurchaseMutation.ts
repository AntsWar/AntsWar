import { qk } from "@/shared/quries/keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { sellPurchase, type SellPurchaseRequest } from "../api/sellPurchase"

export function useSellPurchaseMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: qk.order(),
    mutationFn: (request: SellPurchaseRequest) => sellPurchase(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qk.getMe() })
    },
  })
}
