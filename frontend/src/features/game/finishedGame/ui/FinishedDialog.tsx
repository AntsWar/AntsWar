import { PlayerTable, type Player } from "@/entities/player"
import { ScoreChart, useMeQuery, useScoreStore } from "@/features/getMe"
import { Button } from "@/shared/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import { ChartArea } from "lucide-react"

export default function FinishedDialog({
  open,
  players,
}: {
  open: boolean
  players: Array<Player>
}) {
  const { data: me } = useMeQuery()

  const sortedPlayers = [...players].sort(
    (a, b) => b.balance.amount - a.balance.amount
  )
  const scores = useScoreStore((state) => state.scores)
  const data = scores.map((score, index) => ({
    time: index + 1,
    score: score.amount,
  }))

  return (
    <Dialog open={open}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            랭킹
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 text-base font-semibold">
            <ChartArea />
            기록
          </div>
          <ScoreChart data={data} />
        </div>
        <PlayerTable players={sortedPlayers ?? []} me={me?.player} />
        <DialogFooter>
          <Button onClick={() => window.location.reload()}>나가기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
