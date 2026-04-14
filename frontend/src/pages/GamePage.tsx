import { MarketSection } from "@/features/market"
import { ParticipantSection } from "@/features/participant"
import { PortfolioSection } from "@/features/portfolio"
import { TabToEarnButton } from "@/features/seedIncome"

export default function GamePage() {
  return (
    <div className="flex flex-col gap-7">
      <div>시드 123456</div>
      <ParticipantSection />
      <MarketSection />
      <PortfolioSection />
      <TabToEarnButton />
    </div>
  )
}
