import { JoinDialog } from "@/features/game/joinGame"
import { StompProvider } from "@/shared/lib/stomp/StompProvider"
import { GameProvider, useGame } from "@/entities/game"
import GameSection from "@/widgets/game/ui/GameSection"
import { GameSocketListener } from "@/features/game/getGame"
import { FinishedDialog } from "@/features/game/finishedGame"
import { ChatBox } from "@/features/chat"
import { useState } from "react"
import RemainingTime from "@/features/game/remainingTime/RemainingTime"
import { Banknote, Clock, MessageCircle } from "lucide-react"
import { Money } from "@/shared/model/Money"
import { useMeQuery } from "@/features/getMe"
import { Button } from "@/shared/ui/button"
import { cn } from "@/shared/ui/lib"

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
  const [chatOpen, setChatOpen] = useState(true)
  const { data: me } = useMeQuery()

  if (!game) return null

  const gameId = game.id

  return (
    <StompProvider>
      <GameSocketListener gameId={gameId} />

      <div className="flex h-screen justify-center">
        <div className="flex w-full max-w-2xl flex-col px-3">
          <div className="flex justify-between py-3">
            <div className="flex items-center gap-2 rounded-xl">
              <Clock className="size-5 text-secondary" />
              <div className="text-base text-muted-foreground">
                <RemainingTime />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Banknote className="text-secondary" />
              <Money money={me?.player.balance} />
            </div>
            <div>
              <Button onClick={() => setChatOpen(true)}>
                <MessageCircle />
                채팅
              </Button>
            </div>
          </div>

          <div className="no-scrollbar overflow-y-auto pb-4">
            <GameSection />
          </div>
        </div>
        <div
          className={cn(
            chatOpen ? "block" : "hidden",
            "fixed z-40 mt-12 h-[calc(100vh-4rem)] w-full max-w-2xl px-3 lg:static lg:w-sm"
          )}
        >
          <ChatBox gameId={gameId} onClose={() => setChatOpen(false)} />
        </div>
      </div>
    </StompProvider>
  )
}
