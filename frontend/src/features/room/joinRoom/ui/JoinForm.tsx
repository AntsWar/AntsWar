import { Button } from "@/shared/ui/button"
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/input"
import { useState } from "react"
import { useNavigate } from "react-router"

export default function JoinForm(props: {
  onJoin: (password: string) => void
  apiCode: string
}) {
  const { apiCode, onJoin } = props
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const getErrorMessage = (apiCode: string) => {
    switch (apiCode) {
      case "ROOM_REQUIRE_PASSWORD":
        return "비밀번호가 필요합니다."
      case "ROOM_INVALID_PASSWORD":
        return "비밀번호가 틀렸습니다."
      default:
        return apiCode
    }
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

      <p className="animate-in text-sm text-destructive fade-in slide-in-from-top-1">
        {getErrorMessage(apiCode)}
      </p>

      <DialogFooter className="py-3">
        <Button
          disabled={!password.trim()}
          onClick={() => onJoin(password.trim())}
        >
          입장하기
        </Button>
        <Button variant={"outline"} onClick={() => navigate("/")}>
          돌아가기
        </Button>
      </DialogFooter>
    </>
  )
}
