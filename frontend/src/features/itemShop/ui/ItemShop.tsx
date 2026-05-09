import type { Item } from "@/entities/item"
import { ItemCard } from "./ItemCard"
import { FieldGroup } from "@/shared/ui/field"

export function ItemShop({ items }: { items: Array<Item> }) {
  return (
    <FieldGroup className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <ItemCard key={item.name} item={item} />
      ))}
    </FieldGroup>
  )
}
