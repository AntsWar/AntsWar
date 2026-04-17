import type { AxiosError } from "axios"
import axios from "axios"

export type ApiFieldError = {
  field: string
  value: string
  reason: string
}

export type ErrorResponse = {
  code: string
  message?: string | null
  errors?: ApiFieldError[] | null
}

export type ApiError = AxiosError<ErrorResponse> & {
  apiCode: string
  apiMessage?: string | null
  apiErrors?: ApiFieldError[] | null
}

export function isApiError(error: unknown): error is ApiError {
  return axios.isAxiosError<ErrorResponse>(error)
}
