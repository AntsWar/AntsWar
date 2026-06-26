import { queryClient } from "@/shared/queries/queryClient"
import { QueryClientProvider } from "@tanstack/react-query"

export function QueryProvider(props: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  )
}
