import {
  GameCapacitySelect,
  GameModeSelect,
  GamePasswordInput,
  GameTitleInput,
  type GameMode,
} from "@/entities/game"
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
import { registerGame } from "../api/registerGame"
import { useMutation } from "@tanstack/react-query"
import type { RegisterGameRequest } from "../api/types"

export default function GameRegister() {
  const [name, setName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [capacity, setCapacity] = useState<number>(5)
  const [mode, setMode] = useState<GameMode>({
    type: "TIME",
    target: 5,
  })

  const { mutateAsync } = useMutation({
    mutationKey: ["registerGame"],
    mutationFn: registerGame,
  })

  const handleClick = () => {
    mutateAsync({
      name: name,
      password: password,
      capacity: capacity,
      mode: mode,
    } as RegisterGameRequest)
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
            <GameTitleInput
              placeholder="방 제목"
              value={name}
              onChange={setName}
            />
          </Field>

          <Field>
            <FieldLabel>비밀번호</FieldLabel>
            <GamePasswordInput
              placeholder="비밀번호"
              value={password}
              onChange={setPassword}
            />
          </Field>

          <Field>
            <FieldLabel>모드 선택</FieldLabel>
            <GameModeSelect mode={mode} onChange={setMode} />
          </Field>
          <Field>
            <FieldLabel>인원 수 선택</FieldLabel>
            <GameCapacitySelect
              value={String(capacity)}
              onValueChange={(value) => setCapacity(Number(value))}
            />
          </Field>
        </FieldGroup>
        <DialogFooter className="py-3" showCloseButton>
          <Button onClick={handleClick}>생성</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
