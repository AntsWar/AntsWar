import { Button } from "@/shared/ui/button"
import { useState } from "react"
import { useJoinGameMutation } from "../api/useJoinGameMutation"
import { type Game } from "@/entities/game"
import { Logo } from "@/shared/ui/Logo"
import { useQueryClient } from "@tanstack/react-query"
import { qk } from "@/shared/queries/keys"
import { Card, WideCard } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import Sword from "@/assets/icon/sword.svg?react"
import Clock from "@/assets/icon/clock.svg?react"
import Manual from "./Manual"

export default function JoinDialog({
  setGame,
}: {
  setGame: (game: Game) => void
}) {
  const queryClient = useQueryClient()

  const [name, setName] = useState(() => {
    const saved = getCookie("playerName")
    return saved ? decodeURIComponent(saved) : ""
  })
  const { mutate, isPending } = useJoinGameMutation()

  const handleJoin = () => {
    const finalName = name.trim() || "작은개미"

    mutate(finalName, {
      onSuccess: async ({ game }) => {
        setGame(game)
        queryClient.invalidateQueries({ queryKey: qk.getMe() })
      },
    })
  }

  return (
    <div className="flex h-full items-center justify-center gap-8">
      <div className="w-sm items-center space-y-4">
        <WideCard size="md" className="rounded-xl">
          <div className="flex items-center gap-4">
            <Clock className="size-10" />
            남은 전쟁 시간
            <span className="text-2xl font-extrabold">60:00</span>
          </div>
          <span className="text-sm text-muted-foreground">
            1시간마다 새로운 전쟁이 시작됩니다.
          </span>
        </WideCard>
        <Logo />
        <div className="space-y-2">
          <Input
            inputSize="lg"
            value={name}
            placeholder="호걸의 이름을 입력하시오"
            maxLength={10}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            size="lg"
            className="w-full bg-primary"
            onClick={() => handleJoin()}
            disabled={isPending}
          >
            <span className="flex gap-2 text-lg font-semibold">
              <Sword className="size-6" />
              전장에 참여하기
            </span>
          </Button>
        </div>
      </div>
      <Card size="md" className="hidden max-w-sm rounded-xl md:block">
        <div className="space-y-4">
          <div className="text-2xl font-bold">전장 안내서</div>
          <Manual />
        </div>
      </Card>
    </div>
  )
}

function getCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1]
}
