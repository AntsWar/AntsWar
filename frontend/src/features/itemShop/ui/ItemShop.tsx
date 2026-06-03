import { GoldenFingerItemCard } from "./GoldenFingerItemCard"
import { FieldGroup } from "@/shared/ui/field"
import { FakeNewsItemCard } from "./FakeNewsItemCard"
import { LuckyBoxItemCard } from "./LuckyBoxItemCard"
import { NewsRadarItemCard } from "./NewsRadarItemCard"

export function ItemShop() {
  return (
    <FieldGroup className="grid gap-3 sm:grid-cols-2">
      <GoldenFingerItemCard />
      <LuckyBoxItemCard />
      <FakeNewsItemCard />
      <NewsRadarItemCard />
    </FieldGroup>
  )
}
