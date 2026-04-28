import { NameInput } from "@/features/getMe"
import { RoomRegister } from "@/features/room/registerRoom"
import { RoomSearcher } from "@/features/room/searchRoom"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <span className="text-5xl font-bold">개미전쟁</span>
        <div className="flex items-center gap-2 text-sm">
          <span>안녕하세요,</span>
          <NameInput />
          <span>님</span>
        </div>
      </div>

      <div className="flex w-full flex-col gap-5">
        <RoomSearcher />
        <div className="self-end">
          <RoomRegister />
        </div>
      </div>
    </div>
  )
}
