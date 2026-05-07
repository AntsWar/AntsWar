import { JoinDialog } from "@/features/game/joinGame"
import { StompProvider } from "@/shared/lib/stomp/StompProvider"
import { GameProvider, useGame } from "@/entities/game"
import GameStatusBar from "@/widgets/game/ui/GameStatusBar"
import GameSection from "@/widgets/game/ui/GameSection"
import { GameSocketListener } from "@/features/game/getGame"
import { FinishedDialog } from "@/features/game/finishedGame"
import { ChatBox } from "@/features/chat"

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
  if (!game) return null

  const gameId = game.id

  return (
    <StompProvider>
      <GameSocketListener gameId={gameId} />

      <div className="flex h-full">
        <div className="flex-1" />

        <main className="mx-3 flex h-full w-full max-w-2xl flex-col">
          <GameStatusBar />
          <div className="no-scrollbar flex-1 overflow-y-auto py-3">
            <GameSection />
          </div>
        </main>

        <div className="mt-15 mb-3 flex-1 justify-start">
          <div className="mx-3 hidden h-full lg:block">
            <ChatBox gameId={gameId} />
          </div>
        </div>
      </div>
    </StompProvider>
  )
}
