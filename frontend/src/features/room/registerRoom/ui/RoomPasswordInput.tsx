import { roomSpec } from "@/entities/room"
import { Button } from "@/shared/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/shared/ui/input-group"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"

const { passwordMaxLength } = roomSpec

type InputWithCountProps = Omit<
  React.ComponentProps<"input">,
  "value" | "onChange"
> & {
  value: string
  onChange: (value: string) => void
}

export function RoomPasswordInput({
  value,
  onChange,
  ...props
}: InputWithCountProps) {
  const [showPassword, setShowPassword] = useState(false)
  const maxLength = passwordMaxLength

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value.slice(0, maxLength))
  }

  return (
    <InputGroup>
      <InputGroupInput
        {...props}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
      />
      <InputGroupAddon align="inline-end">
        <div>
          <Button
            className="bg-transparent text-muted-foreground"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            {showPassword ? (
              <EyeIcon className="size-5" />
            ) : (
              <EyeOffIcon className="size-5" />
            )}
          </Button>
        </div>
        <InputGroupText>
          {value.length}/{maxLength}
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  )
}
