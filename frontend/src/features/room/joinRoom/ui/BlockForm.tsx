import { Button } from "@/shared/ui/button"
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import { useNavigate } from "react-router"

export default function BlockForm(props: { apiCode: string }) {
  const { apiCode } = props
  const navigate = useNavigate()

  const getErrorMessage = (apiCode: string) => {
    switch (apiCode) {
      case "ROOM_FULL":
        return "방이 가득 찼습니다."
      case "GAME_NOT_WAITING":
        return "이미 시작된 방입니다."
      case "ROOM_NOT_FOUND":
        return "방을 찾을 수 없습니다."
      case "GAME_FINISHED":
        return "게임이 끝났습니다."
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
