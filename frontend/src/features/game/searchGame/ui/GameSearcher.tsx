import { gameSpec, GameTable } from "@/entities/game"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/ui/input-group"
import { Search } from "lucide-react"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { searchGame } from "../api/searchGame"

const { titleMaxLength } = gameSpec

export default function RoomSearcher() {
  const [input, setInput] = useState<string>("")
  const [search, setSearch] = useState("")

  const { data: games = [] } = useQuery({
    queryKey: ["searchGame"],
    queryFn: () => searchGame(search || undefined),
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value.slice(0, titleMaxLength))
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearch(input)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <Search className="size-5" />
          </InputGroupAddon>

          <InputGroupInput
            value={input}
            onChange={handleChange}
            placeholder="방 검색"
            maxLength={titleMaxLength}
          />
        </InputGroup>
      </form>
      <GameTable games={games} />
    </div>
  )
}
