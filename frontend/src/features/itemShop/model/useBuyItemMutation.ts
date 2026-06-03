import { qk } from "@/shared/quries/keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { buyItem } from "../api/buyItem"
import { toast } from "sonner"

type BuyItemVariables = {
  item: string
  code?: string
}

export function useBuyItemMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: qk.buyItem(),

    mutationFn: ({ item, code }: BuyItemVariables) => buyItem(item, code),

    onSuccess: (_data, variables) => {
      toast.success(`${variables.item} 구매 완료`)
      queryClient.invalidateQueries({ queryKey: qk.getMe() })
    },

    onError: (error) => {
      toast.error(error.message)
    },
  })
}
