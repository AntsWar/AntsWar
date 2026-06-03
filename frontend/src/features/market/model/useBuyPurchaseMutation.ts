import { qk } from "@/shared/quries/keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { buyPurchase, type BuyPurchaseRequest } from "../api/buyPurchase"

export function useBuyPurchaseMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: qk.order(),
    mutationFn: (request: BuyPurchaseRequest) => buyPurchase(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qk.getMe() })
    },
  })
}
