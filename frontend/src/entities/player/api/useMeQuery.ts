import { API_PATH } from "@/shared/api/path"
import { api } from "@/shared/api"
import type { Me } from "../model/types"
import { useQuery } from "@tanstack/react-query"
import { qk } from "@/shared/queries/keys"

export function useMeQuery() {
  return useQuery({
    queryKey: qk.getMe(),
    queryFn: getMe,
    staleTime: Infinity,
  })
}

async function getMe() {
  const res = await api.get(`${API_PATH.PLAYER}/me`)
  return res.data as Me
}
