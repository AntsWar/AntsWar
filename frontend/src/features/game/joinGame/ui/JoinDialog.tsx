import { Button } from "@/shared/ui/button2"
import { useState } from "react"
import { useJoinGameMutation } from "../api/useJoinGameMutation"
import { type Game } from "@/entities/game"
import { Logo } from "@/shared/ui/Logo"
import { useQueryClient } from "@tanstack/react-query"
import { qk } from "@/shared/queries/keys"
import { Card } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input2"
import Sword from "@/assets/icon/sword.svg?react"
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
    <div className="relative flex h-full">
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm"
        style={{ backgroundImage: "url('/background.png')" }}
      />
      <div className="relative flex h-full w-full items-center justify-center gap-8">
        <Card
          size="md"
          className="relative z-10 w-full max-w-sm rounded-xl p-8 sm:max-w-2xl"
          contentClassName="flex flex-col items-center gap-12 sm:flex-row "
        >
          <div className="flex flex-1 flex-col items-center space-y-4">
            <Logo />
            <div className="flex w-full flex-col items-center space-y-2">
              <Input
                className="text-center"
                inputSize="md"
                value={name}
                placeholder="호걸의 이름을 입력하시오"
                maxLength={10}
                onChange={(e) => setName(e.target.value)}
              />
              <Button
                size="md"
                className="self-center bg-primary"
                onClick={() => handleJoin()}
                disabled={isPending}
              >
                <div className="flex w-full items-center gap-2 text-lg font-semibold">
                  <Sword className="size-6" />
                  전장에 참여하기
                </div>
              </Button>
            </div>
          </div>
          <div className="hidden max-w-sm flex-1 space-y-4 rounded-xl sm:block">
            <div className="text-2xl font-bold">전장 안내서</div>
            <Manual />
          </div>
        </Card>
      </div>
    </div>
  )
}

function getCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1]
}
