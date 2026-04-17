import { cn } from "@/shared/ui/lib"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import { Lock } from "lucide-react"
import type { Game } from "../model/types"
import { useNavigate } from "react-router"

export default function GameTable(props: { games: Array<Game> }) {
  const { games } = props
  const navigate = useNavigate()
  const handleJoin = (game: Game) => {
    navigate(`/game/${game.id}`)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>방 제목</TableHead>
          <TableHead className="w-25 text-center">모드</TableHead>
          <TableHead className="w-20 text-center">인원</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {games.map((game) => (
          <GameRow key={game.id} game={game} onJoin={() => handleJoin(game)} />
        ))}
      </TableBody>
    </Table>
  )
}

function GameRow({ game, onJoin }: { game: Game; onJoin: () => void }) {
  const gameMode = game.mode.type === "TIME" ? "시간모드" : "금액모드"
  const isFull = game.occupancy.currentCount >= game.occupancy.capacity

  return (
    <TableRow
      className={cn(
        "cursor-pointer",
        isFull && "cursor-not-allowed text-muted-foreground"
      )}
      tabIndex={isFull ? -1 : 0}
      onClick={isFull ? undefined : onJoin}
    >
      <TableCell className="flex flex-row items-center gap-2">
        {game.name}{" "}
        {game.hasPassword && (
          <span>
            <Lock className="size-4" />
          </span>
        )}
      </TableCell>
      <TableCell className="text-center">
        {gameMode} ({game.mode.target}분)
      </TableCell>
      <TableCell className="text-center">
        {game.occupancy.currentCount} / {game.occupancy.capacity}
      </TableCell>
    </TableRow>
  )
}
