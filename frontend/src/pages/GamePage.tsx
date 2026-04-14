import { MarketSection } from "@/features/market"
import { ParticipantSection } from "@/features/participant"
import { PortfolioSection } from "@/features/portfolio"
import { TabToEarnButton } from "@/features/seedIncome"
import { Button } from "@/shared/ui/button"

export default function GamePage() {
  return (
    <>
      <div className="sticky top-0 z-10 bg-background py-2">
        <div className="grid grid-cols-3 items-center">
          <span>방제</span>
          <Button>게임시작</Button>
          <span className="text-right">내 시드 500</span>
        </div>
      </div>
      <div className="flex flex-col gap-7">
        <ParticipantSection />
        <MarketSection />
        <PortfolioSection />
        <TabToEarnButton />
      </div>
    </>
  )
}
