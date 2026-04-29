import { NameInput } from "@/features/getMe"
import { RoomRegister } from "@/features/room/registerRoom"
import { RoomSearcher } from "@/features/room/searchRoom"

export default function HomePage() {
  return (
    <div className="flex h-full items-center">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center">
          <img className="max-w-1/2" src="/logo.png" />
          <div className="text-5xl font-black md:text-7xl">
            개미
            <span className="bg-linear-(--primary-gradient) bg-clip-text text-transparent">
              전쟁
            </span>
          </div>
        </div>

        <div className="flex w-full flex-col gap-5">
          <div className="flex items-center gap-2 self-center text-sm">
            <span>안녕하세요,</span>
            <NameInput />
            <span>님</span>
          </div>
          <RoomSearcher />
          <div className="self-end">
            <RoomRegister />
          </div>
        </div>
      </div>
    </div>
  )
}
