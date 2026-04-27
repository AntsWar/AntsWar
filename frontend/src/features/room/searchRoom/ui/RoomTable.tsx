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
import { useNavigate } from "react-router"
import type { Room } from "../../../../entities/room/model/types"
import { formatTime } from "@/shared/lib/formatTime"

export default function RoomTable(props: { rooms: Array<Room> }) {
  const { rooms } = props
  const navigate = useNavigate()
  const handleJoin = (room: Room) => {
    navigate(`/room/${room.id}`)
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
        {rooms.map((room) => (
          <RoomRow key={room.id} room={room} onJoin={() => handleJoin(room)} />
        ))}
      </TableBody>
    </Table>
  )
}

function RoomRow({ room, onJoin }: { room: Room; onJoin: () => void }) {
  const gameMode = room.mode.type === "TIME" ? "시간모드" : "금액모드"
  const isFull = room.occupancy.currentCount >= room.occupancy.capacity

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
        {room.name}{" "}
        {room.hasPassword && (
          <span>
            <Lock className="size-4" />
          </span>
        )}
      </TableCell>
      <TableCell className="text-center">
        {gameMode} | {formatTime(room.mode.target)}
      </TableCell>
      <TableCell className="text-center">
        {room.occupancy.currentCount} / {room.occupancy.capacity}
      </TableCell>
    </TableRow>
  )
}
