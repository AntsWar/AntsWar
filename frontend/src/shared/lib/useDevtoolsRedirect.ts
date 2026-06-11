import { useEffect } from "react"

function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

export function useDevtoolsRedirect() {
  useEffect(() => {
    if (import.meta.env.DEV) return
    if (isMobile()) return
    const isBlockedPage = window.location.pathname === "/blocked"

    const blockKeys = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()

      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key)) ||
        (e.metaKey && e.altKey && ["i", "j", "c"].includes(key)) ||
        (e.ctrlKey && key === "u")
      ) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    const blockContextMenu = (e: MouseEvent) => e.preventDefault()

    const intervalId = window.setInterval(() => {
      if (isBlockedPage) return

      const threshold = 160

      const opened =
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold

      if (opened) {
        sessionStorage.setItem("devtools_detected", "1")
        window.location.replace("/blocked")
      }
    }, 500)

    document.addEventListener("keydown", blockKeys)
    document.addEventListener("contextmenu", blockContextMenu)

    return () => {
      document.removeEventListener("keydown", blockKeys)
      document.removeEventListener("contextmenu", blockContextMenu)
      window.clearInterval(intervalId)
    }
  }, [])
}
