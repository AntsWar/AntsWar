export const qk = {
  searchRoom: () => ["searchRoom"] as const,
  registerRoom: () => ["registerRoom"] as const,
  joinRoom: (gameId: string) => ["joinRoom", gameId] as const,

  getGame: (gameId: string) => ["getGame", gameId] as const,
  getMe: (gameId: string) => ["getMe", gameId] as const,
  order: (gameId: string) => ["order", gameId] as const,
  earn: (gameId: string) => ["earn", gameId] as const,
}
