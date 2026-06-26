import type { ReactNode } from "react"

type Props = {
  icon: ReactNode
  title: string
  description: ReactNode
}

export default function SectionHeader({ icon, title, description }: Props) {
  return (
    <div>
      <div className="flex items-center gap-2 text-xl font-bold">
        {icon}
        {title}
      </div>
      <span className="text-sm text-muted-foreground">{description}</span>
    </div>
  )
}
