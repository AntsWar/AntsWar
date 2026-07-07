import { create } from "zustand"
import { useGameTimeStore } from "@/entities/game"

export type NewsType = "news" | "breaking"

export type NewsItem = {
  message: string
  type: NewsType
  receivedAt: number
}

type NoticeStore = {
  message: string | null
  type: NewsType
  history: NewsItem[]
  setMessage: (message: string, type: NewsType) => void
  clear: () => void
}

export const useNoticeStore = create<NoticeStore>((set) => ({
  message: null,
  type: "news",
  history: [],
  setMessage: (message, type) =>
    set((prev) => ({
      message,
      type,
      history: [{ message, type, receivedAt: useGameTimeStore.getState().getElapsedSeconds() }, ...prev.history],
    })),
  clear: () => set({ message: null, type: "news", history: [] }),
}))
