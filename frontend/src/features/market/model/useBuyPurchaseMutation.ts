import { qk } from "@/shared/queries/keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { buyPurchase, type BuyPurchaseRequest } from "../api/buyPurchase"
import type { Me } from "@/entities/player"
import type { Purchase } from "@/entities/purchase"
import type { PositionType } from "@/entities/position"
import { toast } from "sonner"

export type BuyPurchaseVariable = {
  purchase: Purchase
  positionType: PositionType
  quantity: number
}

export function useBuyPurchaseMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: qk.order(),
    mutationFn: (request: BuyPurchaseVariable) => {
      const me = queryClient.getQueryData<Me>(qk.getMe())
      if (!me) throw new Error("플레이어 정보를 찾을 수 없습니다.")
      if (request.quantity <= 0) throw new Error("수량이 없습니다")

      if (
        me.player.balance.amount <
        request.purchase.price.amount * request.quantity
      )
        throw new Error("돈이 부족합니다.")

      return buyPurchase({
        purchaseId: request.purchase.id,
        positionType: request.positionType,
        quantity: request.quantity,
      } as BuyPurchaseRequest)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qk.getMe() })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
