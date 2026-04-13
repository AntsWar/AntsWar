import { type RoomMode } from "@/entities/room"
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
import RoomTitleInput from "./RoomTitleInput"
import { RoomPasswordInput } from "./RoomPasswordInput"
import RoomModeSelect from "./RoomModeSelect"
import RoomCapacitySelect from "./RoomCapacitySelect"
import { Field, FieldGroup, FieldLabel } from "@/shared/ui/field"

export default function RoomRegister() {
  const [title, setTitle] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [capacity, setCapacity] = useState("")
  const [mode, setMode] = useState<RoomMode>({
    name: "시간모드",
    value: 5,
  })

  const handleClick = () => {
    console.log({
      title: title,
      password: password,
      capacity: capacity,
      mode: mode,
    })
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
            <FieldLabel>방 제목</FieldLabel>{" "}
            <RoomTitleInput
              placeholder="방 제목"
              value={title}
              onChange={setTitle}
            />
          </Field>

          <Field>
            <FieldLabel>비밀번호</FieldLabel>{" "}
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
            <RoomCapacitySelect value={capacity} onValueChange={setCapacity} />
          </Field>
        </FieldGroup>
        <DialogFooter className="py-3" showCloseButton>
          <Button onClick={handleClick}>생성</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
