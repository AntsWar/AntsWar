const GUEST_ID_KEY = "GUEST_ID"
const GUEST_NAME_KEY = "GUEST_NAME"

export const getGuestId = () => {
  const savedGuestId = localStorage.getItem(GUEST_ID_KEY)
  if (savedGuestId) return savedGuestId

  const newGuestId = crypto.randomUUID()
  localStorage.setItem(GUEST_ID_KEY, newGuestId)
  return newGuestId
}

export const getGuestName = () => {
  const saved = localStorage.getItem(GUEST_NAME_KEY)
  if (saved) return saved

  const name = getGuestId().slice(0, 8)

  localStorage.setItem(GUEST_NAME_KEY, name)
  return name
}

export const setGuestName = (name: string) => {
  localStorage.setItem(GUEST_NAME_KEY, name)
}
