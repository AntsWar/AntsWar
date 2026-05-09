import { useMeQuery } from "@/features/getMe"
import { qk } from "@/shared/quries/keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { buyFakeNewsItem } from "../api/buyFakeNewsItem"

export function useBuyFakeNewsItemMutation() {
  const queryClient = useQueryClient()
  const { data: me } = useMeQuery()

  return useMutation({
    mutationKey: qk.buyItem(),
    mutationFn: async (code: string) => {
      if (!me) throw new Error("내 정보가 없습니다.")

      if (me.player.balance.amount < 200) {
        throw new Error("잔액이 부족합니다.")
      }

      return buyFakeNewsItem(code)
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: qk.getMe(),
      }),
  })
}
