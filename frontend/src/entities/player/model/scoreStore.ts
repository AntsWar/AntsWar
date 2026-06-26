import { create } from "zustand"
import type { Money } from "@/shared/model/Money"

type ScoreStore = {
  scores: Money[]
  addScore: (score: Money) => void
  clear: () => void
}

export const useScoreStore = create<ScoreStore>((set) => ({
  scores: [],

  addScore: (score) =>
    set((state) => ({
      scores: [...state.scores, score],
    })),

  clear: () => set({ scores: [] }),
}))
