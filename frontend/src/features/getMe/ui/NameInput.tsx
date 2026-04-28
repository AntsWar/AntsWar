import { getGuestName, setGuestName } from "@/shared/lib/guestStorage"
import { Input } from "@/shared/ui/input"
import { useState } from "react"

export default function NameInput() {
  const [value, setValue] = useState<string>(getGuestName())

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue) // state 업데이트
    setGuestName(newValue) // 외부 저장
  }

  return (
    <Input
      className="w-32"
      value={value}
      onChange={handleChange}
      maxLength={10}
    />
  )
}
