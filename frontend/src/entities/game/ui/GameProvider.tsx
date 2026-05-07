import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react"
import type { Game } from "../model/types"

type GameContextValue = {
  game: Game | null
  setGame: Dispatch<SetStateAction<Game | null>>
  finished: boolean
  setFinished: Dispatch<SetStateAction<boolean>>
}

const GameContext = createContext<GameContextValue | null>(null)

function GameProvider({ children }: { children: ReactNode }) {
  const [game, setGame] = useState<Game | null>(null)
  const [finished, setFinished] = useState<boolean>(false)

  return (
    <GameContext.Provider value={{ game, setGame, finished, setFinished }}>
      {children}
    </GameContext.Provider>
  )
}

function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error("GameProvider 밖에서 사용 불가")
  return ctx
}

// eslint-disable-next-line react-refresh/only-export-components
export { GameProvider, useGame }
