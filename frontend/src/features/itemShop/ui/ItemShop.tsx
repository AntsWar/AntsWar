import { GoldenFingerItemCard } from "./GoldenFingerItemCard"
import { FakeNewsItemCard } from "./FakeNewsItemCard"
import { LuckyBoxItemCard } from "./LuckyBoxItemCard"

export function ItemShop() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-4">
      <GoldenFingerItemCard />
      <LuckyBoxItemCard />
      <FakeNewsItemCard />
    </div>
  )
}
