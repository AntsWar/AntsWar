import { useEffect, useState } from "react"
import { type Game } from "@/entities/game"
import { PlayerTable, useMeQuery } from "@/entities/player"
import { FinishedDialog } from "@/features/game/finishedGame"
import { ChatBox } from "@/features/chat"
import { Card } from "@/shared/ui/card"
import Carrier from "@/assets/icon/Carrier.svg?react"
import GameSection from "./GameSection"
import { useGameEvents } from "../model/useGameEvents"
import { useScoreTracking } from "../model/useScoreTracking"

export default function GameView({ init }: { init: Game }) {
  const [game, setGame] = useState<Game>(init)
  const [finished, setFinished] = useState(false)
  const { data: me } = useMeQuery()

  useGameEvents({ setGame, setFinished })
  useScoreTracking(finished)

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [])

  return (
    <div className="flex h-full w-full justify-center gap-4">
      <FinishedDialog open={finished} players={game.players} />
      <div className="min-h-0 max-w-4xl min-w-0 flex-1">
        <GameSection game={game} />
      </div>
      <div className="hidden w-80 min-w-0 gap-4 md:flex md:flex-col">
        <Card size="sm" className="gap-2 rounded-xl">
          <div className="flex items-center gap-2">
            <Carrier className="size-6" />
            <span className="text-xl font-bold">개미 랭킹</span>
          </div>
          <PlayerTable players={game.players} me={me?.player} />
        </Card>
        <div className="min-h-0 flex-1">
          <ChatBox gameId={game.id} />
        </div>
      </div>
    </div>
  )
}
