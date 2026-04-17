import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import type { Player } from "../model/types"
import { formatMoney } from "@/shared/lib/formatMoney"

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
          <PlayerRow key={player.name} player={player} />
        ))}
      </TableBody>
    </Table>
  )
}
function PlayerRow({ player }: { player: Player }) {
  return (
    <TableRow>
      <TableCell>{player.name}</TableCell>
      <TableCell className="text-right">
        {formatMoney(player.balance)}
      </TableCell>
    </TableRow>
  )
}
