import { GameRegister } from "@/features/game/registerGame"
import { GameSearcher } from "@/features/game/searchGame"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center gap-10">
      <div className="text-4xl font-bold">개미전쟁</div>
      <div className="flex w-full flex-col gap-5">
        <GameSearcher />
        <div className="self-end">
          <GameRegister />
        </div>
      </div>
    </div>
  )
}
