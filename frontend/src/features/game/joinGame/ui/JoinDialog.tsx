import { Button } from "@/shared/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/input"
import { useEffect, useState } from "react"
import { joinGame } from "../api/JoinGame"
import { useMutation } from "@tanstack/react-query"
import { isApiError } from "@/shared/api/apiError"
import { useNavigate } from "react-router"

export default function JoinDialog(props: { gameId: string }) {
  const { gameId } = props
  const [open, setOpen] = useState(false)
  const [apiCode, setApiCode] = useState("")

  const { mutate, isPending } = useMutation({
    mutationKey: ["joinGame"],
    mutationFn: joinGame,
    onSuccess: () => {
      setOpen(false)
    },
    onError: (err) => {
      if (!isApiError(err)) return
      setApiCode(err.apiCode)
      setOpen(true)
    },
  })

  useEffect(() => {
    mutate({
      gameId,
      request: {},
    })
  }, [gameId, mutate])

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        {apiCode === "GAME_INVALID_PASSWORD" ||
        apiCode === "GAME_REQUIRE_PASSWORD" ? (
          <JoinForm
            apiCode={apiCode}
            onSubmitPassword={(password: string) => {
              mutate({
                gameId,
                request: { password },
              })
            }}
            isPending={isPending}
          />
        ) : (
          <BlockForm apiCode={apiCode} />
        )}
      </DialogContent>
    </Dialog>
  )
}

function JoinForm(props: {
  apiCode: string
  onSubmitPassword: (password: string) => void
  isPending: boolean
}) {
  const { apiCode, onSubmitPassword, isPending } = props
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = () => {
    onSubmitPassword(password.trim())
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>입장</DialogTitle>
        <DialogDescription>비밀번호가 등록된 게임입니다</DialogDescription>
      </DialogHeader>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호 입력"
      />
      {apiCode === "GAME_INVALID_PASSWORD" && (
        <p className="animate-in text-sm text-destructive fade-in slide-in-from-top-1">
          비밀번호가 틀렸습니다.
        </p>
      )}

      <DialogFooter className="py-3">
        <Button disabled={!password.trim() || isPending} onClick={handleSubmit}>
          입장하기
        </Button>
        <Button variant={"outline"} onClick={() => navigate("/")}>
          돌아가기
        </Button>
      </DialogFooter>
    </>
  )
}

function BlockForm(props: { apiCode: string }) {
  const { apiCode } = props
  const navigate = useNavigate()

  const getErrorMessage = (apiCode: string) => {
    switch (apiCode) {
      case "GAME_FULL":
        return "방이 가득 찼습니다."
      case "GAME_NOT_READY":
        return "이미 시작된 방입니다."
      case "GAME_NOT_FOUND":
        return "방을 찾을 수 없습니다."
      default:
        return apiCode
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>입장 불가</DialogTitle>
        <DialogDescription>{getErrorMessage(apiCode)}</DialogDescription>
      </DialogHeader>
      <DialogFooter className="py-3">
        <Button variant={"outline"} onClick={() => navigate("/")}>
          돌아가기
        </Button>
      </DialogFooter>
    </>
  )
}
