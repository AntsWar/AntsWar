import { create } from "zustand"
import type { PricePoint, Purchase } from "./types"

type StockItem = {
  stock: Purchase
  history: PricePoint[]
}

type StockStore = {
  stocks: StockItem[]
  selectedStockCode: string

  setStocks: (stocks: Purchase[], gameTime?: number) => void
  selectStock: (code: string) => void
  resetStocks: () => void
}

export const useStockStore = create<StockStore>((set) => ({
  stocks: [],
  selectedStockCode: "SKY_HIGH",

  setStocks: (stocks, gameTime?) =>
    set((state) => ({
      selectedStockCode:
        state.selectedStockCode ?? stocks[0]?.meta.code ?? null,

      stocks: stocks.map((stock) => {
        const prev = state.stocks.find(
          (item) => item.stock.meta.code === stock.meta.code
        )

        if (stock.priceHistory.length > 0) {
          return { stock, history: stock.priceHistory }
        }

        const newPoint: PricePoint = {
          price: stock.price.amount,
          gameTime: gameTime ?? (prev?.history.at(-1)?.gameTime ?? 0) + 3,
        }
        const history = [...(prev?.history ?? []), newPoint]
        return {
          stock,
          history: history.length > 100 ? history.slice(-100) : history,
        }
      }),
    })),

  selectStock: (code) => {
    set({ selectedStockCode: code })
  },

  resetStocks: () =>
    set({
      stocks: [],
      selectedStockCode: "SKY_HIGH",
    }),
}))
