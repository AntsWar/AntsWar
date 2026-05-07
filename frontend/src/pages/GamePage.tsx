import { JoinDialog } from "@/features/game/joinGame"
import { StompProvider } from "@/shared/lib/stomp/StompProvider"
import { GameProvider, useGame } from "@/entities/game"
import GameStatusBar from "@/widgets/game/ui/GameStatusBar"
import GameSection from "@/widgets/game/ui/GameSection"
import { GameSocketListener } from "@/features/game/getGame"
import { FinishedDialog } from "@/features/game/finishedGame"

export default function GamePage() {
  return (
    <GameProvider>
      <JoinDialog />
      <FinishedDialog />
      <GameView />
    </GameProvider>
  )
}

function GameView() {
  const { game } = useGame()
  if (!game) return

  return (
    <>
      <StompProvider>
        <GameSocketListener />
      </StompProvider>

      <GameStatusBar />
      <GameSection />
    </>
  )
}
