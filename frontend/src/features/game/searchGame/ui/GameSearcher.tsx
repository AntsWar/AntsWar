import { gameSpec, GameTable, type Game } from "@/entities/game"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/ui/input-group"
import { Search } from "lucide-react"
import { useState } from "react"

const { titleMaxLength } = gameSpec

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
      <GameTable games={games} />
    </div>
  )
}

const games = [
  {
    id: 2,
    title: "게임 같이 하실 분",
    occupancy: {
      currentCount: 5,
      capacity: 6,
    },
    hasPassword: true,
    mode: {
      type: "time",
      target: 10,
    },
  },
  {
    id: 3,
    title: "코딩 스터디",
    occupancy: {
      currentCount: 2,
      capacity: 8,
    },
    hasPassword: false,
    mode: {
      type: "time",
      target: 10,
    },
  },
  {
    id: 4,
    title: "비밀 방",
    occupancy: {
      currentCount: 4,
      capacity: 4,
    },
    hasPassword: true,
    mode: {
      type: "time",
      target: 10,
    },
  },
  {
    id: 5,
    title: "잡담방",
    occupancy: {
      currentCount: 7,
      capacity: 12,
    },
    hasPassword: false,
    mode: {
      type: "time",
      target: 10,
    },
  },
] as Array<Game>
