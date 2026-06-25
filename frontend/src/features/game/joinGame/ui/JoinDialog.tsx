import { Button } from "@/shared/ui/button"
import { useState } from "react"
import { useJoinGameMutation } from "../api/useJoinGameMutation"
import { type Game } from "@/entities/game"
import { Logo } from "@/shared/ui/Logo"
import { useQueryClient } from "@tanstack/react-query"
import { qk } from "@/shared/quries/keys"
import { Card, WideCard } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import Sword from "@/assets/icon/sword.svg?react"
import Target from "@/assets/icon/target.svg?react"
import Speaker from "@/assets/icon/speaker.svg?react"
import Sprout from "@/assets/icon/sprout.svg?react"
import Store from "@/assets/icon/store.svg?react"
import Chat from "@/assets/icon/chat.svg?react"
import Clock from "@/assets/icon/clock.svg?react"

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

        queryClient.invalidateQueries({
          queryKey: qk.getMe(),
        })
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

// function InfoDialog() {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Info className="text-primary" />
//       </DialogTrigger>

//       <DialogContent className="flex max-h-dvh max-w-dvh flex-col p-8 sm:max-h-[calc(100dvh-4rem)] sm:max-w-lg">
//         <div className="shrink-0">
//           <Logo />
//         </div>

//         <div className="min-h-0 flex-1 space-y-4 overflow-y-auto">
//           <p className="text-2xl font-bold">서비스 소개</p>
//           <div className="text-base leading-7 text-muted-foreground">
//             <p>개미전쟁은 실시간 투자 시뮬레이션 게임입니다.</p>
//             <p>
//               플레이어는 가상의 자산으로 기업에 투자하며, 뉴스와 시장의 변화
//               속에서 수익을 만들어야 합니다.
//             </p>
//             <p>
//               채팅과 아이템을 활용해 다른 플레이어와 경쟁하고, 가장 많은 자산을
//               모은 플레이어가 승리합니다.
//             </p>
//           </div>
//           <div className="space-y-4">
//             <p className="flex items-center gap-2 text-2xl font-bold">
//               전장 안내서
//             </p>
//             <Manual />
//           </div>
//           <div className="flex gap-5 space-y-1 border-t pt-4">
//             <p className="text-sm font-medium">문의 및 피드백</p>

//             <a
//               href="mailto:kym.goldapple@gmail.com"
//               className="text-sm hover:underline"
//             >
//               kym.goldapple@gmail.com
//             </a>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

function Manual() {
  return (
    <div className="space-y-4 text-sm">
      <div>
        <div className="flex items-center gap-1 text-lg font-semibold">
          <Target className="size-5" /> 목표
        </div>
        <p className="text-muted-foreground">
          한 시간 동안 가장 많은 자산을 모아 1위를 차지하세요.
        </p>
      </div>

      <div>
        <div className="flex items-center gap-1 text-lg font-semibold">
          <Sprout className="size-5 text-primary" /> 투자하라!
        </div>
        <p className="text-muted-foreground">
          종목을 매수하거나 공매도할 수 있습니다. 가격 변동에 따라 수익과 손실이
          발생합니다.
        </p>
      </div>

      <div>
        <div className="flex items-center gap-1 text-lg font-semibold">
          <Speaker className="size-5" /> 뉴스를 확인하라!
        </div>
        <p className="text-muted-foreground">
          시장은 뉴스에 반응합니다. 뉴스의 흐름을 읽고 남들보다 먼저 투자하세요.
        </p>
      </div>

      <div>
        <div className="flex items-center gap-1 text-lg font-semibold">
          <Store className="size-5 text-primary" /> 아이템을 사라!
        </div>
        <p className="text-muted-foreground">
          아이템을 사용해 정보를 얻거나 상대를 교란할 수 있습니다.
        </p>
      </div>

      <div>
        <div className="flex items-center gap-1 text-lg font-semibold">
          <Chat className="size-5 text-primary" /> 소통하라!
        </div>
        <p className="text-muted-foreground">
          정보는 무기이자 함정입니다. 다른 플레이어와 소통하며 기회를 찾고,
          때로는 거짓 정보에 속지 않도록 주의하세요.
        </p>
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
