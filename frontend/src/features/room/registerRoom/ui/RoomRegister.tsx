import { Button } from "@/shared/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog"
import { useState } from "react"
import { Field, FieldGroup, FieldLabel } from "@/shared/ui/field"
import { registerRoom, type RegisterRoomRequest } from "../api/registerRoom"
import { useMutation } from "@tanstack/react-query"
import { Spinner } from "@/shared/ui/spinner"
import { useNavigate } from "react-router"
import { qk } from "@/shared/quries/keys"
import type { RoomMode } from "@/entities/room"
import { TIME_OPTIONS } from "../config"
import RoomTitleInput from "./RoomTitleInput"
import RoomPasswordInput from "./RoomPasswordInput"
import RoomModeSelect from "./RoomModeSelect"
import RoomCapacitySelect from "./RoomCapacitySelect"

export default function RoomRegister() {
  const [name, setName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [capacity, setCapacity] = useState<number>(5)
  const [mode, setMode] = useState<RoomMode>({
    type: "TIME",
    target: TIME_OPTIONS[0],
  })

  const navigate = useNavigate()

  const { mutateAsync, isPending } = useMutation({
    mutationKey: qk.registerRoom(),
    mutationFn: registerRoom,
    onSuccess: (data) => {
      navigate(`/room/${data.id}`)
    },
  })

  const handleClick = () => {
    mutateAsync({
      name: name,
      password: password,
      capacity: capacity,
      mode: mode,
    } as RegisterRoomRequest)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit">방 만들기</Button>
      </DialogTrigger>
      <DialogContent className="w-lg">
        <DialogHeader>
          <DialogTitle>방 만들기</DialogTitle>
        </DialogHeader>
        <FieldGroup className="gap-4">
          <Field>
            <FieldLabel>방 제목</FieldLabel>
            <RoomTitleInput
              placeholder="방 제목"
              value={name}
              onChange={setName}
            />
          </Field>

          <Field>
            <FieldLabel>비밀번호</FieldLabel>
            <RoomPasswordInput
              placeholder="비밀번호"
              value={password}
              onChange={setPassword}
            />
          </Field>

          <Field>
            <FieldLabel>모드 선택</FieldLabel>
            <RoomModeSelect mode={mode} onChange={setMode} />
          </Field>
          <Field>
            <FieldLabel>인원 수 선택</FieldLabel>
            <RoomCapacitySelect
              value={String(capacity)}
              onValueChange={(value) => setCapacity(Number(value))}
            />
          </Field>
        </FieldGroup>
        <DialogFooter className="py-3" showCloseButton>
          <Button onClick={handleClick} disabled={isPending || !name.trim()}>
            {isPending && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
            생성
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
