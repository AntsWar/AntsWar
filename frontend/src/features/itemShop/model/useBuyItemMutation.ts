import { useMeQuery } from "@/features/getMe"
import { qk } from "@/shared/quries/keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { buyItem } from "../api/buyItem"
import type { Money } from "@/shared/model/Money"

export function useBuyItemMutation() {
  const queryClient = useQueryClient()
  const { data: me } = useMeQuery()

  return useMutation({
    mutationKey: qk.buyItem(),
    mutationFn: async ({
      item,
      price,
      code,
    }: {
      item: string
      price: Money
      code?: string
    }) => {
      if (!me) throw new Error("내 정보가 없습니다.")

      if (me.player.balance.amount < price.amount) {
        throw new Error("잔액이 부족합니다.")
      }

      return buyItem(item, code)
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: qk.getMe(),
      }),
  })
}
