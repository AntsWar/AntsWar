import { gameSpec } from "../config"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/shared/ui/input-group"

const { titleMaxLength } = gameSpec

type InputWithCountProps = Omit<
  React.ComponentProps<"input">,
  "value" | "onChange"
> & {
  value: string
  onChange: (value: string) => void
}

export default function GameTitleInput({
  value,
  onChange,
  ...props
}: InputWithCountProps) {
  const maxLength = titleMaxLength

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value.slice(0, maxLength))
  }

  return (
    <InputGroup>
      <InputGroupInput
        {...props}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupText>
          {value.length}/{maxLength}
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  )
}
