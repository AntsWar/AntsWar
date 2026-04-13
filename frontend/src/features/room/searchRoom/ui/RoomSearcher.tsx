import { roomSpec, type Room } from "@/entities/room"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/ui/input-group"
import { cn } from "@/shared/ui/lib"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import { Lock, Search } from "lucide-react"
import { useState } from "react"

const { titleMaxLength } = roomSpec

export default function RoomSearcher() {
  const [search, setSearch] = useState<string>("")
  const maxLength = titleMaxLength

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.slice(0, maxLength))
  }

  return (
    <>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <Search className="size-5" />
        </InputGroupAddon>

        <InputGroupInput
          value={search}
          onChange={handleChange}
          placeholder="방 검색"
          maxLength={maxLength}
        />
      </InputGroup>
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
    </>
  )
}

function RoomRow({ room }: { room: Room }) {
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
        {room.mode.name} ({room.mode.value}분)
      </TableCell>
      <TableCell className="text-center">
        {room.currentCount} / {room.capacity}
      </TableCell>
    </TableRow>
  )
}

const rooms: Room[] = [
  {
    id: 1,
    title: "자유 채팅방",
    currentCount: 3,
    capacity: 10,
    hasPassword: false,
    mode: {
      name: "시간모드",
      value: 10,
    },
  },
  {
    id: 2,
    title: "게임 같이 하실 분",
    currentCount: 5,
    capacity: 6,
    hasPassword: true,
    mode: {
      name: "시간모드",
      value: 10,
    },
  },
  {
    id: 3,
    title: "코딩 스터디",
    currentCount: 2,
    capacity: 8,
    hasPassword: false,
    mode: {
      name: "시간모드",
      value: 10,
    },
  },
  {
    id: 4,
    title: "비밀 방",
    currentCount: 4,
    capacity: 4,
    hasPassword: true,
    mode: {
      name: "시간모드",
      value: 10,
    },
  },
  {
    id: 5,
    title: "잡담방",
    currentCount: 7,
    capacity: 12,
    hasPassword: false,
    mode: {
      name: "시간모드",
      value: 10,
    },
  },
]
