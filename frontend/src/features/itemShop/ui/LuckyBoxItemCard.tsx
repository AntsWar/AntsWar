import { Button } from "@/shared/ui/button"
import { useBuyItemMutation } from "../model/useBuyItemMutation"
import { MoneyText } from "@/shared/model/Money"
import Gift from "@/assets/icon/gift.svg?react"

export function LuckyBoxItemCard() {
  const { mutate, isPending } = useBuyItemMutation()

  const price = { amount: 1000 }

  const handleClick = () => {
    mutate({
      item: { code: "LUCKY_BOX", price: price },
    })
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex gap-4">
        <Gift className="size-12" />
        <div>
          <p className="text-lg font-bold">럭키 박스</p>
          <p className="text-sm text-muted-foreground">
            10원 ~ 2000원을 받습니다.
          </p>
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
