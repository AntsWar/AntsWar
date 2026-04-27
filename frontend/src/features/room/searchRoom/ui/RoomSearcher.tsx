import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { qk } from "@/shared/quries/keys"
import { searchRoom } from "@/features/room/searchRoom"
import RoomTable from "./RoomTable"
import RoomSearchInput from "./RoomSearchInput"

export default function RoomSearcher() {
  const [search, setSearch] = useState<string>("")

  const { data: rooms = [] } = useQuery({
    queryKey: qk.searchRoom(),
    queryFn: () => searchRoom(search || undefined),
  })

  return (
    <div>
      <RoomSearchInput setSearch={setSearch} />
      <RoomTable rooms={rooms} />
    </div>
  )
}
