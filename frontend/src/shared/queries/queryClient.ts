import { QueryClient } from "@tanstack/react-query"
import { isAxiosError } from "axios"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status

          if (status && status < 500) {
            return false
          }
        }
        return failureCount < 3
      },
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
    },
  },
})
