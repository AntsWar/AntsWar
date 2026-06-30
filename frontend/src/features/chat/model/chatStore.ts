import { create } from "zustand"

export type ChatMessage = {
  name: string
  content: string
}

type ChatStore = {
  messages: ChatMessage[]
  add: (msg: ChatMessage) => void
  clear: () => void
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  add: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
  clear: () => set({ messages: [] }),
}))
