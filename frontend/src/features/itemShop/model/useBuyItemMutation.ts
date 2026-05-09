import type { Item } from "@/entities/item"
import { useMeQuery } from "@/features/getMe"
import { qk } from "@/shared/quries/keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { buyItem } from "../api/buyItem"

export function useBuyItemMutation() {
  const queryClient = useQueryClient()
  const { data: me } = useMeQuery()

  return useMutation({
    mutationKey: qk.buyItem(),
    mutationFn: async (item: Item) => {
      if (!me) throw new Error("내 정보가 없습니다.")

      if (me.player.balance.amount < item.price.amount) {
        throw new Error("잔액이 부족합니다.")
      }

      return buyItem(item.name)
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: qk.getMe(),
      }),
  })
}
