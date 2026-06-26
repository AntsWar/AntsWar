import { qk } from "@/shared/queries/keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { sellPurchase, type SellPurchaseRequest } from "../api/sellPurchase"
import type { Me } from "@/entities/player"

export function useSellPurchaseMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: qk.order(),
    mutationFn: (request: SellPurchaseRequest) => {
      const me = queryClient.getQueryData<Me>(qk.getMe())
      if (!me) throw new Error("플레이어 정보를 찾을 수 없습니다.")
      if (request.quantity <= 0) throw new Error("수량이 없습니다")

      return sellPurchase(request)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qk.getMe() })
    },
  })
}
