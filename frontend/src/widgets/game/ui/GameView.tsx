import { useEffect, useState } from "react"
import { type Game } from "@/entities/game"
import { RankingCard, useMeQuery } from "@/entities/player"
import { FinishedDialog } from "@/features/game/finishedGame"
import { ChatBox } from "@/features/chat"

import Carrier from "@/assets/icon/Carrier.svg?react"
import GameSection from "./GameSection"
import { useGameEvents } from "../model/useGameEvents"
import { useScoreTracking } from "../model/useScoreTracking"
import { Button } from "@/shared/ui/button2"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"

export default function GameView({ init }: { init: Game }) {
  const [game, setGame] = useState<Game>(init)
  const [finished, setFinished] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
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

      {/* 데스크탑 사이드바 */}
      <div className="hidden w-80 min-w-0 gap-4 md:flex md:flex-col">
        <RankingCard players={game.players} me={me?.player} />
        <div className="min-h-0 flex-1">
          <ChatBox gameId={game.id} />
        </div>
      </div>

      {/* 모바일 FAB */}
      <Button
        className="fixed right-5 bottom-5 z-40 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-lg md:hidden"
        onClick={() => setModalOpen(true)}
      >
        <Carrier className="size-5" />
        랭킹·채팅
      </Button>

      {/* 모바일 풀스크린 모달 */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="flex h-dvh flex-col gap-0 rounded-none bg-transparent p-0 text-foreground sm:max-w-md">
          <DialogHeader className="border-b px-4 py-3">
            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
              개미 랭킹 · 전략실
            </DialogTitle>
          </DialogHeader>
          <div className="flex min-h-0 flex-1 flex-col gap-4 py-4">
            <RankingCard players={game.players} me={me?.player} />
            <div className="min-h-0 flex-1">
              <ChatBox gameId={game.id} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
