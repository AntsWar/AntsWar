import { Button } from "@/shared/ui/button"
import { useBuyItemMutation } from "../model/useBuyItemMutation"
import { MoneyText } from "@/shared/model/Money"
import { Separator } from "@/shared/ui/separator"
import { RadioTower, ShoppingCart } from "lucide-react"
import { useNoticeStore } from "@/entities/news"
import { useEffect, useState } from "react"
import { formatTimeToMS } from "@/shared/lib/formatTime"
import { toast } from "sonner"

export function NewsRadarItemCard() {
  const { mutate, isPending } = useBuyItemMutation()
  const expiredAt = useNoticeStore((state) => state.expiredAt)

  const [, forceUpdate] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      forceUpdate((v) => v + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // eslint-disable-next-line react-hooks/purity
  const remainMs = Math.max(0, expiredAt - Date.now())
  const remainSeconds = Math.ceil(remainMs / 1000)

  const active = remainMs > 0

  const price = { amount: 3000 }

  const handleClick = () => {
    mutate(
      {
        item: "NEWS_RADAR",
      },
      {
        onSuccess: () => {
          toast.info("뉴스레이더 구매 완료")
          useNoticeStore.getState().activate(1000 * 60 * 5)
        },
      }
    )
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-input/30 p-4">
      <div className="flex justify-between">
        <div className="flex flex-row items-center gap-3">
          <RadioTower />
          뉴스레이더
          {active && <p className="text-sm">{formatTimeToMS(remainSeconds)}</p>}
        </div>

        <MoneyText money={price} />
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground">5분 동안 모든 뉴스를 받습니다</p>
        </div>

        <Button
          variant="outline"
          onClick={handleClick}
          disabled={isPending || active}
        >
          <ShoppingCart />
          {active ? "사용 중" : "구매"}
        </Button>
      </div>
    </div>
  )
}
