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
      <InputGroup className="border-primary has-[[data-slot=input-group-control]:focus-visible]:border-primary has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-primary/50">
        <InputGroupAddon align="inline-start">
          <Search className="size-5 text-primary" />
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
