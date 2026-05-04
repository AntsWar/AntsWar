import { Button } from "@/shared/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/dialog"
import { useState } from "react"
import { useJoinGameMutation } from "../api/useJoinGameMutation"
import type { Game } from "@/entities/game"
import { Swords } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/ui/input-group"
import AntFace from "@/assets/icon/ant_face_icon.svg?react"

export default function JoinDialog(props: {
  open: boolean
  setGame: (game: Game) => void
}) {
  const { open, setGame } = props
  const [name, setName] = useState<string>("")
  const { mutate, isPending } = useJoinGameMutation()

  const handleJoin = () => {
    const finalName = name.trim() || "작은 개미"
    mutate(finalName, {
      onSuccess: (data) => setGame(data.game),
    })
  }

  return (
    <Dialog open={open}>
      <DialogContent
        className="animate-[border-sun_3s_ease-in-out_infinite]!"
        showCloseButton={false}
      >
        <DialogTitle>
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-col items-center">
              <img className="max-w-1/2" src="/logo.png" />
              <div className="text-7xl font-black">
                개미
                <span className="bg-linear-(--primary-gradient) bg-clip-text text-transparent">
                  전쟁
                </span>
              </div>
            </div>
            <p className="text-muted-foreground">영웅호걸들의 투자전쟁</p>
          </div>
        </DialogTitle>
        <InputGroup className="h-10 rounded-full border-primary/50 px-2">
          <InputGroupAddon>
            <AntFace className="text-primary" />
          </InputGroupAddon>
          <InputGroupInput
            className="h-10 text-center"
            value={name}
            placeholder="호걸의 이름을 입력하시오"
            onChange={(e) => setName(e.target.value)}
          />
        </InputGroup>

        <Button size={"lg"} onClick={() => handleJoin()} disabled={isPending}>
          <Swords className="size-6" />
          <span className="text-lg font-semibold">전장에 참여하기</span>
        </Button>
      </DialogContent>
    </Dialog>
  )
}
