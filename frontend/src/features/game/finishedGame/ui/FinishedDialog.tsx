import {
  RankingCard,
  type Player,
  useMeQuery,
  useScoreStore,
} from "@/entities/player"
import { Button } from "@/shared/ui/button2"
import { ChartArea } from "lucide-react"
import { ScoreChart } from "./ScoreChart"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"

export default function FinishedDialog({
  open,
  players,
}: {
  open: boolean
  players: Array<Player>
}) {
  const { data: me } = useMeQuery()
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
            결과
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 text-base font-semibold">
            <ChartArea />
            기록
          </div>
          <ScoreChart data={data} />
        </div>
        <RankingCard players={players} me={me?.player} />
        <DialogFooter>
          <Button onClick={() => window.location.reload()}>나가기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
