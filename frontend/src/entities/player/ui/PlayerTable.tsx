import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import type { Player } from "../model/types"
import { MoneyText } from "@/shared/model/Money"

export default function PlayerTable({
  players,
  me,
}: {
  players: Array<Player>
  me?: Player
}) {
  const sorted = [...players].sort(
    (a, b) => b.balance.amount - a.balance.amount
  )
  const top5 = sorted.slice(0, 5)
  const myRank = sorted.findIndex((player) => player.id === me?.id) + 1
  const isInTop5 = myRank > 0 && myRank <= 5

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>순위</TableHead>
          <TableHead>이름</TableHead>
          <TableHead className="text-right">총 자산</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {top5 &&
          top5.map((player, index) => (
            <PlayerRow
              key={player.id}
              player={player}
              rank={index + 1}
              isMe={me?.id === player.id}
            />
          ))}
        {!isInTop5 && me && <PlayerRow player={me} rank={myRank} isMe />}
      </TableBody>
    </Table>
  )
}

function PlayerRow({
  player,
  rank,
  isMe,
}: {
  player: Player
  rank: number
  isMe: boolean
}) {
  return (
    <TableRow className={isMe ? "text-primary" : ""}>
      <TableCell>{rank}</TableCell>
      <TableCell>{player.name}</TableCell>
      <TableCell className="text-right">
        <MoneyText money={player.asset} />
      </TableCell>
    </TableRow>
  )
}
