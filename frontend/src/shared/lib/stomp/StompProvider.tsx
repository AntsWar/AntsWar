import { Client } from "@stomp/stompjs"
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"

type StompContextValue = {
  connected: boolean
  getClient: () => Client | null
}

const StompContext = createContext<StompContextValue | null>(null)

const RECONNECT_DELAY = 1000
const MAX_DELAY = 30000
const TIMEOUT = 4000

export function StompProvider({ children }: { children: ReactNode }) {
  const clientRef = useRef<Client | null>(null)
  const generationRef = useRef(0)
  const [socketConnected, setSocketConnected] = useState(false)

  useEffect(() => {
    const gen = ++generationRef.current

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:"
    let delay = RECONNECT_DELAY

    const c = new Client({
      brokerURL: `${protocol}//${window.location.host}/api/ws`,
      reconnectDelay: delay,
      connectionTimeout: TIMEOUT,

      onConnect: () => {
        if (generationRef.current !== gen) return
        delay = RECONNECT_DELAY
        c.reconnectDelay = delay
        setSocketConnected(true)
      },

      onWebSocketClose: () => {
        if (generationRef.current !== gen) return
        setSocketConnected(false)
        delay = Math.min(delay * 2, MAX_DELAY)
        c.reconnectDelay = delay
      },
    })

    clientRef.current = c
    c.activate()

    return () => {
      clientRef.current = null
      void c.deactivate()
    }
  }, [])

  const value = useMemo<StompContextValue>(
    () => ({
      connected: socketConnected,
      getClient: () => clientRef.current,
    }),
    [socketConnected]
  )

  return <StompContext.Provider value={value}>{children}</StompContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStompClient() {
  const ctx = useContext(StompContext)
  if (!ctx) throw new Error("StompProvider 밖에서 사용 불가")
  return ctx
}
