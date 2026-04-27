import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/ui/input-group"
import { Search } from "lucide-react"
import { useState } from "react"

export default function RoomSearchInput(props: {
  setSearch: (name: string) => void
}) {
  const { setSearch } = props
  const [input, setInput] = useState<string>("")

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearch(input)
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <Search className="size-5" />
        </InputGroupAddon>

        <InputGroupInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="방 검색"
        />
      </InputGroup>
    </form>
  )
}
