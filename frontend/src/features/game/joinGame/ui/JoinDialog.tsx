import { Button } from "@/shared/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/dialog"
import { useState } from "react"
import { useJoinGameMutation } from "../api/useJoinGameMutation"
import type { Game } from "@/entities/game"
import { Coins, Shield, Swords, TrendingUp } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/ui/input-group"
import AntFace from "@/assets/icon/ant_face_icon.svg?react"
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel"
import { Separator } from "@/shared/ui/separator"
import ThemeSwitch from "@/shared/ui/ThemeSwitch"

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
        className="animate-[border-sun_3s_ease-in-out_infinite]! rounded-3xl border p-8 before:pointer-events-none before:absolute before:top-1/2 before:left-1/2 before:z-[-1] before:h-[105%] before:w-[106%] before:-translate-x-1/2 before:-translate-y-1/2 before:bg-[url('/card_light.png')] before:bg-size-[100%_100%] before:bg-center before:bg-no-repeat before:content-[''] dark:before:bg-[url('/card_dark.png')]"
        showCloseButton={false}
        backdropBlur={false}
      >
        <DialogTitle>
          <div className="flex justify-end">
            <ThemeSwitch />
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-col items-center">
              <img className="max-w-1/2" src="/logo.png" />
              <div className="text-7xl font-black text-foreground">
                개미
                <span className="bg-linear-(--primary-gradient) bg-clip-text text-transparent">
                  전쟁
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center">
                <span className="h-px w-10 bg-linear-to-r from-transparent to-secondary/70" />
                <span className="size-1 rotate-45 bg-secondary" />
              </div>

              <span className="text-sm text-muted-foreground">
                영웅호걸들의 투자전쟁
              </span>

              <div className="flex items-center">
                <span className="size-1 rotate-45 bg-secondary" />
                <span className="h-px w-10 bg-linear-to-l from-transparent to-secondary/70" />
              </div>
            </div>
          </div>
        </DialogTitle>
        <InputGroup className="h-10 rounded-full border-secondary/50 px-2 has-[[data-slot=input-group-control]:focus-visible]:ring-secondary/20">
          <InputGroupAddon>
            <AntFace className="text-secondary" />
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
        <Separator />
        <Carousel>
          <CarouselContent>
            <CarouselItem className="flex basis-1/3 flex-col items-center gap-1">
              <div className="flex items-center gap-2 text-lg font-bold text-secondary/80">
                <TrendingUp />
                차트
              </div>
              <div className="text-center text-sm text-muted-foreground">
                흐름을 읽어라
              </div>
            </CarouselItem>

            <CarouselItem className="flex basis-1/3 flex-col items-center gap-1">
              <div className="flex items-center gap-2 text-lg font-bold text-secondary/80">
                <Coins />
                수익
              </div>
              <div className="text-center text-sm text-muted-foreground">
                쟁취하라
              </div>
            </CarouselItem>

            <CarouselItem className="flex basis-1/3 flex-col items-center gap-1">
              <div className="flex items-center gap-2 text-lg font-bold text-secondary/80">
                <Shield />
                생존
              </div>
              <div className="text-center text-sm text-muted-foreground">
                살아남아라
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </DialogContent>
    </Dialog>
  )
}
