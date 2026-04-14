import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import type { Player } from "../model/types"

const myId = 3

export default function PlayerTable(props: { players: Array<Player> }) {
  const { players } = props

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead className="text-right">자산</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map((player) => (
          <PlayerRow key={player.id} player={player} />
        ))}
      </TableBody>
    </Table>
  )
}
function PlayerRow({ player }: { player: Player }) {
  const isMe = myId === player.id
  return (
    <TableRow>
      <TableCell className={isMe ? "font-bold" : ""}>{player.name}</TableCell>
      <TableCell className="text-right">{player.balance}</TableCell>
    </TableRow>
  )
}
