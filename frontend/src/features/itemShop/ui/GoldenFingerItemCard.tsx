import { Button } from "@/shared/ui/button"
import { useBuyItemMutation } from "../model/useBuyItemMutation"
import { MoneyText } from "@/shared/model/Money"
import Hand from "@/assets/icon/hand.svg?react"

export function GoldenFingerItemCard() {
  const { mutate, isPending } = useBuyItemMutation()

  const price = { amount: 0 }

  const handleClick = () => {
    mutate({
      item: { code: "GOLDEN_FINGER", price: price },
    })
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex gap-4">
        <Hand className="size-12" />
        <div>
          <p className="text-lg font-bold">코인</p>
          <p className="text-sm text-muted-foreground">10원을 얻습니다.</p>
        </div>
      </div>
      <p className="text-lg font-bold">
        <MoneyText money={price} />
      </p>
      <Button
        size="md"
        className="w-36"
        onClick={handleClick}
        disabled={isPending}
      >
        구매
      </Button>
    </div>
  )
}
