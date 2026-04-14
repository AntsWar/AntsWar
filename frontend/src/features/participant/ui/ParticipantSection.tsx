import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"

const myId = 2

export default function ParticipantSection() {
  const sorted = [...participants].sort((a, b) => b.balance - a.balance)

  return (
    <section>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead className="text-right">자산</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((participant) => (
            <ParticipantRow key={participant.id} participant={participant} />
          ))}
        </TableBody>
      </Table>
    </section>
  )
}

type Participant = {
  id: number
  name: string
  balance: number
}

function ParticipantRow({ participant }: { participant: Participant }) {
  const isMe = myId === participant.id
  return (
    <TableRow>
      <TableCell className={isMe ? "font-bold" : ""}>
        {participant.name}
      </TableCell>
      <TableCell className="text-right">{participant.balance}</TableCell>
    </TableRow>
  )
}

const participants = [
  {
    id: 1,
    name: "TraderA",
    balance: 125000,
  },
  {
    id: 2,
    name: "BullMaster",
    balance: 98000,
  },
  {
    id: 3,
    name: "ShortKing",
    balance: 142000,
  },
  {
    id: 4,
    name: "CryptoWolf",
    balance: 87000,
  },
  {
    id: 5,
    name: "AlphaTrader",
    balance: 110500,
  },
] as Array<Participant>
