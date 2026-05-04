import { JoinDialog } from "@/features/game/joinGame"
import { useState } from "react"
import { GameView } from "@/widgets/game"
import type { Game } from "@/entities/game"

export default function GamePage() {
  const [game, setGame] = useState<Game>()

  return (
    <>
      <JoinDialog open={!game} setGame={setGame} />

      {game && <GameView game={game} />}
    </>
  )
}
