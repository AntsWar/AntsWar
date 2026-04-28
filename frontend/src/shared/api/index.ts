import axios from "axios"
import { getGuestId } from "../lib/guestStorage"
import type { ApiError, ErrorResponse } from "./apiError"

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  config.headers["GUEST_ID"] = getGuestId()

  return config
})

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (axios.isAxiosError<ErrorResponse>(error)) {
      const apiError = error as ApiError

      apiError.apiCode = error.response?.data?.code ?? ""
      apiError.apiMessage = error.response?.data?.message ?? null
      apiError.apiErrors = error.response?.data?.errors ?? null

      return Promise.reject(apiError)
    }

    return Promise.reject(error)
  }
)
