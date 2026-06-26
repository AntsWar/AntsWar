import { create } from "zustand"

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
      history: [{ message, type, receivedAt: Date.now() }, ...prev.history],
    })),
  clear: () => set({ message: null, type: "news", history: [] }),
}))
