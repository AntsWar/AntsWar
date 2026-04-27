import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import type { Player } from "../model/types"
import { Money } from "@/shared/model/Money"

export default function PlayerTable(props: { players: Array<Player> }) {
  const { players } = props
  const sorted = [...players].sort(
    (a, b) => b.balance.amount - a.balance.amount
  )

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead className="text-right">자산</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted &&
          sorted.map((player) => (
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
        <Money money={player.balance} />
      </TableCell>
    </TableRow>
  )
}
