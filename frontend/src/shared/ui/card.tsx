import type { ReactNode, SVGProps, ComponentType } from "react"
import { cn } from "./lib"

import CardSmSvg from "@/assets/Card-sm.svg?react"
import CardMdSvg from "@/assets/Card-md.svg?react"
import CardLgSvg from "@/assets/Card-lg.svg?react"

import WideCardLgSvg from "@/assets/WideCard-lg.svg?react"
import WideCardMdSvg from "@/assets/WideCard-md.svg?react"

import HorizonCardSvg from "@/assets/HorizonCard.svg?react"

type CardSize = "sm" | "md" | "lg"

interface CardProps {
  size?: CardSize
  className?: string
  contentClassName?: string
  children: ReactNode
}

const cardSvgMap: Record<CardSize, ComponentType<SVGProps<SVGSVGElement>>> = {
  sm: CardSmSvg,
  md: CardMdSvg,
  lg: CardLgSvg,
}

export function Card({
  size = "md",
  className,
  contentClassName,
  children,
}: CardProps) {
  const CardSvg = cardSvgMap[size]

  return (
    <div className={cn("relative bg-card p-4", className)}>
      <CardSvg className="pointer-events-none absolute inset-0 size-full stroke-2" />

      <div className={cn("relative", contentClassName)}>{children}</div>
    </div>
  )
}

type WideCardSize = "md" | "lg"

interface WideCardProps {
  size?: WideCardSize
  className?: string
  children: ReactNode
}

const wideCardSvgMap: Record<
  WideCardSize,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  md: WideCardMdSvg,
  lg: WideCardLgSvg,
}

export function WideCard({ size = "md", className, children }: WideCardProps) {
  const CardSvg = wideCardSvgMap[size]

  return (
    <div
      className={cn("relative min-w-0 overflow-hidden bg-card p-4", className)}
    >
      <CardSvg className="pointer-events-none absolute inset-0 size-full stroke-2" />

      <div className="relative w-full min-w-0">{children}</div>
    </div>
  )
}

interface HorizonCardProps {
  className?: string
  contentClassName?: string
  children: ReactNode
}

export function HorizonCard({
  className,
  children,
  contentClassName,
}: HorizonCardProps) {
  return (
    <div className={cn("relative bg-card p-4", className)}>
      <HorizonCardSvg className="pointer-events-none absolute inset-0 size-full stroke-2" />

      <div className={cn("relative", contentClassName)}>{children}</div>
    </div>
  )
}
