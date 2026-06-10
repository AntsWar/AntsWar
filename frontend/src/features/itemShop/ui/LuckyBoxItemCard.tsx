import { Button } from "@/shared/ui/button"
import { useBuyItemMutation } from "../model/useBuyItemMutation"
import { MoneyText } from "@/shared/model/Money"
import { Separator } from "@/shared/ui/separator"
import { Gift, ShoppingCart } from "lucide-react"

export function LuckyBoxItemCard() {
  const { mutate, isPending } = useBuyItemMutation()

  const price = { amount: 1000 }

  const handleClick = () => {
    mutate({
      item: { code: "LUCKY_BOX", price: price },
    })
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-input/30 p-4">
      <div className="flex justify-between">
        <div className="flex flex-row gap-3">
          <Gift />
          럭키 박스
        </div>

        <MoneyText money={price} />
      </div>
      <Separator />

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">10 ~ 2000원을 얻습니다.</p>
        <Button variant="outline" onClick={handleClick} disabled={isPending}>
          <ShoppingCart />
          구매
        </Button>
      </div>
    </div>
  )
}
