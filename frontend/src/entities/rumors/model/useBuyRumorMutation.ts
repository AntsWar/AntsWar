import { useMutation } from "@tanstack/react-query"
import { buyRumor } from "../api/buyRumor"
import type { RumorType } from "./types"
import { qk } from "@/shared/queries/keys"
import { queryClient } from "@/shared/queries/queryClient"
import type { Me } from "@/entities/player"
import type { Money } from "@/shared/model/Money"

export function useBuyRumorMutation() {
  return useMutation({
    mutationKey: qk.buyRumor(),
    mutationFn: ({
      type,
      price,
      category,
    }: {
      type: RumorType
      price: Money
      category: string
    }) => {
      const me = queryClient.getQueryData<Me>(qk.getMe())

      if (!me) {
        throw new Error("플레이어 정보를 찾을 수 없습니다.")
      }

      if (me.player.balance.amount < price.amount) {
        throw new Error("돈이 부족합니다.")
      }

      return buyRumor(type, category)
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qk.getMe() })
    },
  })
}
