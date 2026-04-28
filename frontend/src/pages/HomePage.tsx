import { NameInput } from "@/features/getMe"
import { RoomRegister } from "@/features/room/registerRoom"
import { RoomSearcher } from "@/features/room/searchRoom"

export default function HomePage() {
  return (
    <div className="relative h-full">
      <div className="absolute top-0 right-0 flex items-center gap-2">
        <span>안녕하세요,</span>
        <NameInput />
        <span>님</span>
      </div>
      <div className="flex h-full flex-col items-center justify-center gap-10">
        <div className="text-4xl font-bold">개미전쟁</div>
        <div className="flex w-full flex-col gap-5">
          <RoomSearcher />
          <div className="self-end">
            <RoomRegister />
          </div>
        </div>
      </div>
    </div>
  )
}
