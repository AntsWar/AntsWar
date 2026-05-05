import { useTheme } from "@/app/provider/theme-provider"
import { Switch } from "@/shared/ui/switch"
import { FieldLabel } from "./field"

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme()

  const isDark = theme === "dark"

  return (
    <div className="flex items-center gap-2">
      <FieldLabel>낮/밤 모드</FieldLabel>
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => {
          setTheme(checked ? "dark" : "light")
        }}
      />
    </div>
  )
}
