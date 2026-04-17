export const API_PATH = {
  SEARCH_GAME: "room/search",
  REGISTER_GAME: "room",
  JOIN_GAME: (gameId: string) => `room/${gameId}/join`,
  GET_GAME: "game",
}
