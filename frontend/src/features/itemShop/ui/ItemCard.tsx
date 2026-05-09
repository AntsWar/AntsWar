import { Button } from "@/shared/ui/button"
import { useBuyItemMutation } from "../model/useBuyItemMutation"
import { itemMeta, type Item } from "@/entities/item"
import { toast } from "sonner"
import { Money } from "@/shared/model/Money"
import { Separator } from "@/shared/ui/separator"
import { ShoppingCart } from "lucide-react"

export function ItemCard({ item }: { item: Item }) {
  const { mutate, isPending } = useBuyItemMutation()
  const meta = itemMeta[item.name]

  const Icon = meta.icon

  const handleClick = () => {
    mutate(item, {
      onError: (error) => {
        toast.error(error.message)
      },
      onSuccess: () => {
        toast.success(`${meta.name} 구매 완료`)
      },
    })
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-input/30 p-4">
      <div className="flex justify-between">
        <div className="flex flex-row gap-3">
          <Icon />
          {meta.name}
        </div>

        <Money money={item.price} />
      </div>
      <Separator />

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">{meta.description}</p>
        <Button variant="outline" onClick={handleClick} disabled={isPending}>
          <ShoppingCart />
          구매
        </Button>
      </div>
    </div>
  )
}
