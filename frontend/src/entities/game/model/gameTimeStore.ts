import { create } from "zustand"

type GameTimeStore = {
  offset: number
  startedAtMs: number
  endedAtMs: number

  setSync: (serverTime: string) => void
  setMeta: (startedAt: string, endedAt: string) => void
  getGameTime: () => number
  getElapsedSeconds: () => number
}

export const useGameTimeStore = create<GameTimeStore>((set, get) => ({
  offset: 0,
  startedAtMs: 0,
  endedAtMs: 0,

  setSync: (serverTime) =>
    set({ offset: new Date(serverTime).getTime() - Date.now() }),

  setMeta: (startedAt, endedAt) =>
    set({
      startedAtMs: new Date(startedAt).getTime(),
      endedAtMs: new Date(endedAt).getTime(),
    }),

  getGameTime: () => Date.now() + get().offset,

  getElapsedSeconds: () =>
    Math.floor((Date.now() + get().offset - get().startedAtMs) / 1000),
}))
