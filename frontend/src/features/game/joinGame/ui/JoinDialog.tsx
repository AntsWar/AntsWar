import { Button } from "@/shared/ui/button"
import { useState } from "react"
import { useJoinGameMutation } from "../api/useJoinGameMutation"
import { type Game } from "@/entities/game"
import {
  Info,
  MessageCircle,
  Shield,
  Store,
  Swords,
  Target,
  TrendingUp,
  TrendingUpDown,
} from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/ui/input-group"
import AntFace from "@/assets/icon/ant_face_icon.svg?react"
import { Separator } from "@/shared/ui/separator"
import ThemeSwitch from "@/shared/ui/ThemeSwitch"
import { Logo } from "@/shared/ui/Logo"
import { useQueryClient } from "@tanstack/react-query"
import { qk } from "@/shared/quries/keys"
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/dialog"

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
    <div className="fixed inset-0 flex items-center justify-center gap-5">
      <div className="w-sm bg-[url('/card_light.png')] bg-size-[100%_100%] p-3 dark:bg-[url('/card_dark.png')]">
        <div className="flex animate-[border-sun_3s_ease-in-out_infinite]! flex-col items-center gap-4 rounded-3xl border p-8">
          <div>
            <div className="flex justify-between">
              <InfoDialog />
              <ThemeSwitch />
            </div>
            <div className="flex flex-col items-center gap-3">
              <Logo />
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
          </div>
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

          <Button
            className="w-full p-3"
            onClick={() => handleJoin()}
            disabled={isPending}
          >
            <Swords className="size-6" />
            <span className="text-lg font-semibold">전장에 참여하기</span>
          </Button>
          <Separator />
          <Footer />
        </div>
      </div>
      <div className="hidden w-sm space-y-4 rounded-2xl border border-secondary/30 bg-popover p-8 md:block">
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center">
            <span className="h-px w-10 bg-linear-to-r from-transparent to-secondary/70" />
            <span className="size-1 rotate-45 bg-secondary" />
          </div>

          <span className="text-2xl font-bold text-secondary/80">
            전장 안내서
          </span>

          <div className="flex items-center">
            <span className="size-1 rotate-45 bg-secondary" />
            <span className="h-px w-10 bg-linear-to-l from-transparent to-secondary/70" />
          </div>
        </div>
        <Manual />
      </div>
    </div>
  )
}

function InfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Info className="text-primary" />
      </DialogTrigger>

      <DialogContent className="flex max-h-dvh max-w-dvh flex-col p-8 sm:max-h-[calc(100dvh-4rem)] sm:max-w-lg">
        <div className="shrink-0">
          <Logo />
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto">
          <p className="text-2xl font-bold">서비스 소개</p>
          <div className="text-base leading-7 text-muted-foreground">
            <p>개미전쟁은 실시간 투자 시뮬레이션 게임입니다.</p>
            <p>
              플레이어는 가상의 자산으로 기업에 투자하며, 뉴스와 시장의 변화
              속에서 수익을 만들어야 합니다.
            </p>
            <p>
              채팅과 아이템을 활용해 다른 플레이어와 경쟁하고, 가장 많은 자산을
              모은 플레이어가 승리합니다.
            </p>
          </div>
          <div className="space-y-4">
            <p className="flex items-center gap-2 text-2xl font-bold">
              <Swords />
              전장 안내서
            </p>
            <Manual />
          </div>
          <div className="flex gap-5 space-y-1 border-t pt-4">
            <p className="text-sm font-medium">문의 및 피드백</p>

            <a
              href="mailto:kym.goldapple@gmail.com"
              className="text-sm hover:underline"
            >
              kym.goldapple@gmail.com
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Manual() {
  return (
    <div className="space-y-3 text-sm">
      <div>
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Target className="size-5 text-primary" /> 목표
        </div>
        <p className="text-muted-foreground">
          한 시간 동안 가장 많은 자산을 모아 1위를 차지하세요.
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 text-lg font-semibold">
          <TrendingUpDown className="size-5 text-primary" /> 투자하라!
        </div>
        <p className="text-muted-foreground">
          종목을 매수하거나 공매도할 수 있습니다. 가격 변동에 따라 수익과 손실이
          발생합니다.
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Info className="size-5 text-primary" /> 뉴스를 확인하라!
        </div>
        <p className="text-muted-foreground">
          시장은 뉴스에 반응합니다. 뉴스의 흐름을 읽고 남들보다 먼저 투자하세요.
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Store className="size-5 text-primary" /> 아이템을 사라!
        </div>
        <p className="text-muted-foreground">
          아이템을 사용해 정보를 얻거나 상대를 교란할 수 있습니다.
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 text-lg font-semibold">
          <MessageCircle className="size-5 text-primary" /> 소통하라!
        </div>
        <p className="text-muted-foreground">
          정보는 무기이자 함정입니다. 다른 플레이어와 소통하며 기회를 찾고,
          때로는 거짓 정보에 속지 않도록 주의하세요.
        </p>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <div className="flex w-full justify-between">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-lg font-bold text-secondary/80">
          <TrendingUp />
          차트
        </div>
        <div className="text-center text-sm text-muted-foreground">
          흐름을 읽어라
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-lg font-bold text-secondary/80">
          <MessageCircle />
          소통
        </div>
        <div className="text-center text-sm text-muted-foreground">
          정보를 공유해라
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-lg font-bold text-secondary/80">
          <Shield />
          생존
        </div>
        <div className="text-center text-sm text-muted-foreground">
          살아남아라
        </div>
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
