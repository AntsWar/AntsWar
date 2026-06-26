import { useState } from "react"
import { ButtonGroup } from "./button-group"
import { cn } from "./lib"

type TradeButtonProps = Omit<
  React.ComponentProps<"button">,
  "children" | "onClick"
> & {
  label: string
  containerClassName?: string
  onClick: (amount: number) => void
}

export function TradeButton({
  label,
  containerClassName,
  onClick,
  ...buttonProps
}: TradeButtonProps) {
  const [amount, setAmount] = useState("1")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 허용
    const value = e.target.value.replace(/\D/g, "")

    // 빈 값은 허용(입력 중)
    setAmount(value)
  }

  const handleClick = () => {
    const value = Number(amount)

    if (!value || value <= 0) return

    onClick?.(value)
  }

  const handleBlur = () => {
    if (amount === "") {
      setAmount("1")
    }
  }

  return (
    <ButtonGroup className={cn("rounded-full", containerClassName)}>
      <input
        type="text"
        inputMode="numeric"
        value={amount}
        onChange={handleChange}
        onBlur={handleBlur}
        maxLength={3}
        className="w-12 pr-1 pl-4 text-center text-background focus:outline-none"
      />

      <button
        type="button"
        onClick={handleClick}
        className="justify-center rounded-full py-2 pr-4 text-background transition active:scale-[0.9] disabled:pointer-events-none disabled:opacity-50"
        {...buttonProps}
      >
        | {label}
      </button>
    </ButtonGroup>
  )
}
