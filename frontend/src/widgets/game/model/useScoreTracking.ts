import { useEffect } from "react"
import { useScoreStore, type Me } from "@/entities/player"
import { queryClient } from "@/shared/queries/queryClient"
import { qk } from "@/shared/queries/keys"

export function useScoreTracking(finished: boolean) {
  useEffect(() => {
    if (finished) return

    const timer = setInterval(() => {
      const currentMe = queryClient.getQueryData<Me>(qk.getMe())
      if (!currentMe) return
      useScoreStore.getState().addScore(currentMe.player.asset)
    }, 1000)

    return () => clearInterval(timer)
  }, [finished])
}
