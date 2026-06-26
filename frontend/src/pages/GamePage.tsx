import { useState } from "react"
import { JoinDialog } from "@/features/game/joinGame"
import { StompProvider } from "@/shared/lib/stomp/StompProvider"
import { type Game } from "@/entities/game"
import { GameSocketProvider } from "@/features/game/socket"
import { GameView } from "@/widgets/game"

export default function GamePage() {
  const [init, setInit] = useState<Game | null>(null)

  if (!init) {
    return <JoinDialog setGame={setInit} />
  }

  return (
    <StompProvider>
      <GameSocketProvider gameId={init.id}>
        <GameView init={init} />
      </GameSocketProvider>
    </StompProvider>
  )
}
