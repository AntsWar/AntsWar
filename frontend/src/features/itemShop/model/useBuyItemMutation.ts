import { qk } from "@/shared/quries/keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { buyItem } from "../api/buyItem"
import { toast } from "sonner"
import type { Me } from "@/features/getMe"
import type { Item } from "@/entities/item"

type BuyItemVariables = {
  item: Item
  code?: string
}

export function useBuyItemMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: qk.buyItem(),

    mutationFn: ({ item, code }: BuyItemVariables) => {
      const me = queryClient.getQueryData<Me>(qk.getMe())

      if (!me) {
        throw new Error("플레이어 정보를 찾을 수 없습니다.")
      }

      if (me.player.balance.amount < item.price.amount) {
        throw new Error("돈이 부족합니다.")
      }
      return buyItem(item.code, code)
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qk.getMe() })
    },

    onError: (error) => {
      toast.error(error.message)
    },
  })
}
