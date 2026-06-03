import { create } from "zustand"

type NoticeStore = {
  expiredAt: number
  activate: (durationMs: number) => void
  clear: () => void
}

export const useNoticeStore = create<NoticeStore>((set) => ({
  expiredAt: 0,

  activate: (durationMs) => {
    set({
      expiredAt: Date.now() + durationMs,
    })
  },

  clear: () => {
    set({
      expiredAt: 0,
    })
  },
}))
