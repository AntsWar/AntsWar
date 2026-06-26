import type { ButtonHTMLAttributes } from "react"

import ButtonSxSvg from "@/assets/RoundedCard-xs.svg?react"
import ButtonSmSvg from "@/assets/RoundedCard-sm.svg?react"
import ButtonMdSvg from "@/assets/RoundedCard-md.svg?react"
import ButtonLgSvg from "@/assets/RoundedCard-lg.svg?react"
import { cn } from "./lib"

type ButtonSize = "xs" | "sm" | "md" | "lg"

interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
> {
  size?: ButtonSize
  className?: string
}

const buttonSvgMap = {
  xs: ButtonSxSvg,
  sm: ButtonSmSvg,
  md: ButtonMdSvg,
  lg: ButtonLgSvg,
}

export function Button({
  size = "sm",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const ButtonSvg = buttonSvgMap[size]

  return (
    <button
      className={cn(
        "relative justify-center rounded-full bg-primary px-4 py-2 transition active:scale-[0.9] disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <ButtonSvg className="pointer-events-none absolute inset-0 size-full stroke-2" />
      {children}
    </button>
  )
}
