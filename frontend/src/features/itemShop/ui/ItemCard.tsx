import { Button } from "@/shared/ui/button"
import { useBuyItemMutation } from "../model/useBuyItemMutation"
import { toast } from "sonner"
import { Money } from "@/shared/model/Money"
import { Separator } from "@/shared/ui/separator"
import { ShoppingCart, type LucideIcon } from "lucide-react"
import type { Item } from "../model/types"

export function ItemCard({
  item,
  name,
  Icon,
  description,
}: {
  item: Item
  name: string
  Icon: LucideIcon
  description: string
}) {
  const { mutate, isPending } = useBuyItemMutation()

  const handleClick = () => {
    mutate(
      { item: item.code, price: item.price },
      {
        onError: (error) => {
          toast.error(error.message)
        },
        onSuccess: () => {
          toast.success(`${name} 구매 완료`)
        },
      }
    )
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-input/30 p-4">
      <div className="flex justify-between">
        <div className="flex flex-row gap-3">
          <Icon />
          {name}
        </div>

        <Money money={item.price} />
      </div>
      <Separator />

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">{description}</p>
        <Button variant="outline" onClick={handleClick} disabled={isPending}>
          <ShoppingCart />
          구매
        </Button>
      </div>
    </div>
  )
}
