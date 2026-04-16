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

export default function GameTable(props: { games: Array<Game> }) {
  const { games } = props
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
          <GameRow key={game.id} game={game} />
        ))}
      </TableBody>
    </Table>
  )
}
function GameRow({ game }: { game: Game }) {
  const gameMode = game.mode.type === "time" ? "시간모드" : "금액모드"

  const isFull = game.occupancy.currentCount >= game.occupancy.capacity
  const handleJoin = () => {
    console.log(game)
  }

  return (
    <TableRow
      className={cn(
        "cursor-pointer",
        isFull && "cursor-not-allowed text-muted-foreground"
      )}
      tabIndex={isFull ? -1 : 0}
      onClick={isFull ? undefined : handleJoin}
    >
      <TableCell className="flex flex-row items-center gap-2">
        {game.title}{" "}
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
