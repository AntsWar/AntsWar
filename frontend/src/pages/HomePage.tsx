import { RoomRegister } from "@/features/room/registerRoom"
import { RoomSearcher } from "@/features/room/searchRoom"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center gap-10">
      <div className="text-4xl font-bold">개미전쟁</div>
      <div className="flex w-full flex-col gap-5">
        <RoomSearcher />
        <div className="self-end">
          <RoomRegister />
        </div>
      </div>
    </div>
  )
}
