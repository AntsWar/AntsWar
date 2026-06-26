import type { InputHTMLAttributes } from "react"

import InputSmSvg from "@/assets/RoundedCard-sm.svg?react"
import InputMdSvg from "@/assets/RoundedCard-md.svg?react"
import InputLgSvg from "@/assets/RoundedCard-lg.svg?react"
import { cn } from "./lib"

type InputSize = "sm" | "md" | "lg"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: InputSize
  containerClassName?: string
}

const inputSvgMap = {
  sm: InputSmSvg,
  md: InputMdSvg,
  lg: InputLgSvg,
}

export function Input({
  inputSize = "md",
  className,
  containerClassName,
  ...props
}: InputProps) {
  const InputSvg = inputSvgMap[inputSize]

  return (
    <div
      className={cn(
        "relative rounded-full bg-card px-4 py-2",
        containerClassName
      )}
    >
      <InputSvg className="pointer-events-none absolute inset-0 size-full stroke-2" />

      <input
        className={cn("relative focus:outline-none", className)}
        {...props}
      />
    </div>
  )
}
