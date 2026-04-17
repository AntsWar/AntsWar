import axios from "axios"

const GUEST_ID_KEY = "GUEST_ID"

const guestId = (() => {
  const savedGuestId = localStorage.getItem(GUEST_ID_KEY)
  if (savedGuestId) return savedGuestId

  const newGuestId = crypto.randomUUID()
  localStorage.setItem(GUEST_ID_KEY, newGuestId)
  return newGuestId
})()

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  config.headers["GUEST_ID"] = guestId
  return config
})
