import { MarketSection } from "@/features/market"
import { PortfolioSection } from "@/features/portfolio"
import { TabToEarnButton } from "@/features/seedIncome"

export default function GamePage() {
  return (
    <div className="flex flex-col gap-7">
      <div className="p-2">시드 123456</div>
      <MarketSection />
      <PortfolioSection />
      <TabToEarnButton />
    </div>
  )
}
