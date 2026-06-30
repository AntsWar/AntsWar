import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import { Card } from "@/shared/ui/card"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { MoneyText } from "@/shared/model/Money"
import Carrier from "@/assets/icon/Carrier.svg?react"
import type { Player } from "../model/types"

export default function RankingCard({
  players,
  me,
}: {
  players: Array<Player>
  me?: Player
}) {
  const sorted = [...players].sort((a, b) => b.asset.amount - a.asset.amount)

  return (
    <Card size="sm" className="gap-2 rounded-xl">
      <div className="flex items-center gap-2">
        <Carrier className="size-6" />
        <span className="text-xl font-bold">개미 랭킹</span>
      </div>
      <ScrollArea className="h-52">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>순위</TableHead>
              <TableHead>이름</TableHead>
              <TableHead className="text-right">총 자산</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((player, index) => (
              <TableRow
                key={player.id}
                className={me?.id === player.id ? "text-primary" : ""}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{player.name}</TableCell>
                <TableCell className="text-right">
                  <MoneyText money={player.asset} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </Card>
  )
}
