import type { Item } from "@/entities/item"
import { ItemCard } from "./ItemCard"
import { FieldGroup } from "@/shared/ui/field"
import { FakeNewsItemCard } from "./FakeNewsItemCard"

export function ItemShop({ items }: { items: Array<Item> }) {
  return (
    <FieldGroup className="grid gap-3 sm:grid-cols-2">
      {items
        .filter((item) => item.name !== "FAKE_NEWS")
        .map((item) => (
          <ItemCard key={item.name} item={item} />
        ))}
      <FakeNewsItemCard />
    </FieldGroup>
  )
}
