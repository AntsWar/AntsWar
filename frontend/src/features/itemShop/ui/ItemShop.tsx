import { GoldenFingerItemCard } from "./GoldenFingerItemCard"
import { LuckyBoxItemCard } from "./LuckyBoxItemCard"
import { RumorItemCard } from "./RumorItemCard"

export function ItemShop() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-4">
      <GoldenFingerItemCard />
      <LuckyBoxItemCard />
      <RumorItemCard type="RUMOR_BASIC" />
      <RumorItemCard type="RUMOR_PREMIUM" />
    </div>
  )
}
