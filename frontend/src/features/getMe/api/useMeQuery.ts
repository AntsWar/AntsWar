import { qk } from "@/shared/quries/keys"
import { useQuery } from "@tanstack/react-query"
import { getMe } from "./getMe"

export function useMeQuery() {
  return useQuery({
    queryKey: qk.getMe(),
    queryFn: () => getMe(),
  })
}
