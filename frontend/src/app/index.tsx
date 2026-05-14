import { ThemeProvider } from "./provider/theme-provider"
import { createBrowserRouter, RouterProvider } from "react-router"
import RootLayout from "./layouts/RootLayout"
import { QueryProvider } from "./provider/queryProvider"
import { Toaster } from "@/shared/ui/sonner"
import GamePage from "@/pages/GamePage"
import BlockedPage from "@/pages/BlockedPage"
import { useDevtoolsRedirect } from "@/shared/lib/useDevtoolsRedirect"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <GamePage /> },
      { path: "blocked", element: <BlockedPage /> },
    ],
  },
])

export function App() {
  useDevtoolsRedirect()
  return (
    <QueryProvider>
      <ThemeProvider defaultTheme="dark">
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </ThemeProvider>
    </QueryProvider>
  )
}

export default App
