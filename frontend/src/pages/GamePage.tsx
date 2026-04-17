import { JoinDialog } from "@/features/game/joinGame"
import { MarketSection } from "@/features/market"
import { PlayerSection } from "@/features/player"
import { PortfolioSection } from "@/features/portfolio"
import { TabToEarnButton } from "@/features/seedIncome"
import { Button } from "@/shared/ui/button"
import { useParams } from "react-router"

export default function GamePage() {
  const { gameId } = useParams()
  if (!gameId) return null

  return (
    <>
      <JoinDialog gameId={gameId} />
      <div className="sticky top-0 z-10 bg-background py-2">
        <div className="grid grid-cols-3 items-center">
          <span>방제</span>
          <Button>게임시작</Button>
          <span className="text-right">내 시드 500</span>
        </div>
      </div>
      <div className="flex flex-col gap-7">
        <PlayerSection />
        <MarketSection />
        <PortfolioSection />
        <TabToEarnButton />
      </div>
    </>
  )
}
