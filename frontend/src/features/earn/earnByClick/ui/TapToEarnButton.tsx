import { Button } from "@/shared/ui/button"
import { useEffect, useState } from "react"
import { formatTimeToMS } from "@/shared/lib/formatTime"
import { useMutation } from "@tanstack/react-query"
import { qk } from "@/shared/quries/keys"
import { earnByClick } from "../api/earnByClick"
import { queryClient } from "@/shared/quries/queryClient"

const MAX = 3
const COOLDOWN = 10
const REWARD_PER_CLICK = 30
type ChargeState = {
  charge: number
  nextChargeSec: number | null
}

export default function TapToEarnButton(props: {
  gameId: string
  disable: boolean
}) {
  const { gameId, disable } = props
  const [state, setState] = useState<ChargeState>({
    charge: MAX,
    nextChargeSec: null,
  })

  const { mutate, isPending } = useMutation({
    mutationKey: qk.earn(gameId),
    mutationFn: earnByClick,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: qk.getMe(gameId),
      })
    },
  })

  useEffect(() => {
    const id = setInterval(() => {
      setState((prev) => {
        if (prev.charge >= MAX) {
          return prev.nextChargeSec == null
            ? prev
            : { charge: prev.charge, nextChargeSec: null }
        }

        if (prev.nextChargeSec == null) {
          return { ...prev, nextChargeSec: COOLDOWN }
        }

        if (prev.nextChargeSec <= 1) {
          const nextCharge = Math.min(MAX, prev.charge + 1)
          return {
            charge: nextCharge,
            nextChargeSec: nextCharge >= MAX ? null : COOLDOWN,
          }
        }

        return {
          ...prev,
          nextChargeSec: prev.nextChargeSec - 1,
        }
      })
    }, 1000)

    return () => clearInterval(id)
  }, [])

  const handleClick = () => {
    setState((prev) => {
      if (prev.charge <= 0) return prev

      const nextCharge = prev.charge - 1

      return {
        charge: nextCharge,
        nextChargeSec: prev.nextChargeSec ?? COOLDOWN,
      }
    })
    mutate(gameId)
  }

  return (
    <Button
      className="w-full"
      onClick={handleClick}
      disabled={state.charge <= 0 || isPending || disable}
    >
      <div className="flex flex-row items-center gap-2">
        <span>
          클릭 당 {REWARD_PER_CLICK}원 ({state.charge}/{MAX})
        </span>
        <span className="text-xs text-muted">
          {state.nextChargeSec != null
            ? `${formatTimeToMS(state.nextChargeSec)}`
            : ""}
        </span>
      </div>
    </Button>
  )
}
