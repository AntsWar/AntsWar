import { create } from "zustand"
import type { RumorType } from "./types"
import { useGameTimeStore } from "@/entities/game"

type Rumor = {
  content: string
  type: RumorType
  recievedAt: number
}

type RumorStore = {
  rumors: Rumor[]
  add: (content: string, type: RumorType) => void
}

export const useRumorStore = create<RumorStore>((set) => ({
  rumors: [],
  add: (content, type) =>
    set((s) => ({
      rumors: [
        ...s.rumors,
        {
          content,
          type,
          recievedAt: useGameTimeStore.getState().getElapsedSeconds(),
        },
      ],
    })),
}))
