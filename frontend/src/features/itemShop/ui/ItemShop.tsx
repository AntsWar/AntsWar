import { ItemCard } from "./ItemCard"
import { FieldGroup } from "@/shared/ui/field"
import {
  Gift,
  Hand,
  HatGlasses,
  RadioTower,
  type LucideIcon,
} from "lucide-react"
import type { Item } from "../model/types"
import { FakeNewsItemCard } from "./FakeNewsItemCard"

export function ItemShop({ items }: { items: Array<Item> }) {
  const fakeNewsItem = items.find((item) => item.code === "FAKE_NEWS")

  return (
    <FieldGroup className="grid gap-3 sm:grid-cols-2">
      {items
        .filter((item) => item.code !== "FAKE_NEWS")
        .map((item) => {
          const meta = itemMeta[item.code]

          return (
            <ItemCard
              key={item.code}
              item={item}
              name={meta.name}
              Icon={meta.icon}
              description={meta.description}
            />
          )
        })}

      {fakeNewsItem && (
        <FakeNewsItemCard
          item={fakeNewsItem}
          name={itemMeta.FAKE_NEWS.name}
          Icon={itemMeta.FAKE_NEWS.icon}
        />
      )}
    </FieldGroup>
  )
}

const itemMeta: Record<
  string,
  { name: string; icon: LucideIcon; description: string }
> = {
  NEWS_RADAR: {
    name: "뉴스레이더",
    icon: RadioTower,
    description: "모든 뉴스를 받습니다.",
  },
  FAKE_NEWS: {
    name: "가짜 뉴스",
    icon: HatGlasses,
    description: "가짜 뉴스를 퍼뜨립니다.",
  },
  GOLDEN_FINGER: {
    name: "금손",
    icon: Hand,
    description: "10원을 얻습니다.",
  },
  LUCKY_BOX: {
    name: "럭키 박스",
    icon: Gift,
    description: "10 ~ 2000원을 얻습니다.",
  },
}
