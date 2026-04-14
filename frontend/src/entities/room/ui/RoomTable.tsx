import { type Room } from "@/entities/room"
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

export default function RoomTable(props: { rooms: Array<Room> }) {
  const { rooms } = props
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
        {rooms.map((room) => (
          <RoomRow key={room.id} room={room} />
        ))}
      </TableBody>
    </Table>
  )
}
function RoomRow({ room }: { room: Room }) {
  const roomMode = room.mode.name === "timeMode" ? "시간모드" : "금액모드"

  const isFull = room.currentCount >= room.capacity
  const handleJoin = () => {
    console.log(room)
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
        {room.title}{" "}
        {room.hasPassword && (
          <span>
            <Lock className="size-4" />
          </span>
        )}
      </TableCell>
      <TableCell className="text-center">
        {roomMode} ({room.mode.target}분)
      </TableCell>
      <TableCell className="text-center">
        {room.currentCount} / {room.capacity}
      </TableCell>
    </TableRow>
  )
}
