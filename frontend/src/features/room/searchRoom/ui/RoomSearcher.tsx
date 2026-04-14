import { roomSpec, RoomTable, type Room } from "@/entities/room"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/ui/input-group"
import { Search } from "lucide-react"
import { useState } from "react"

const { titleMaxLength } = roomSpec

export default function RoomSearcher() {
  const [search, setSearch] = useState<string>("")
  const maxLength = titleMaxLength

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.slice(0, maxLength))
  }

  return (
    <div>
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
      <RoomTable rooms={rooms} />
    </div>
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
      name: "timeMode",
      target: 10,
    },
  },
  {
    id: 2,
    title: "게임 같이 하실 분",
    currentCount: 5,
    capacity: 6,
    hasPassword: true,
    mode: {
      name: "timeMode",
      target: 10,
    },
  },
  {
    id: 3,
    title: "코딩 스터디",
    currentCount: 2,
    capacity: 8,
    hasPassword: false,
    mode: {
      name: "timeMode",
      target: 10,
    },
  },
  {
    id: 4,
    title: "비밀 방",
    currentCount: 4,
    capacity: 4,
    hasPassword: true,
    mode: {
      name: "timeMode",
      target: 10,
    },
  },
  {
    id: 5,
    title: "잡담방",
    currentCount: 7,
    capacity: 12,
    hasPassword: false,
    mode: {
      name: "timeMode",
      target: 10,
    },
  },
]
