import { create } from "zustand"
import type { Money } from "@/shared/model/Money"
import type { Purchase } from "./types"

type StockItem = {
  stock: Purchase
  history: Money[]
}

type StockStore = {
  stocks: StockItem[]
  selectedStockCode: string

  setStocks: (stocks: Purchase[]) => void
  selectStock: (code: string) => void
  resetStocks: () => void
}

export const useStockStore = create<StockStore>((set) => ({
  stocks: [],
  selectedStockCode: "SAMSON",

  setStocks: (stocks) =>
    set((state) => ({
      selectedStockCode:
        state.selectedStockCode ?? stocks[0]?.meta.code ?? null,

      stocks: stocks.map((stock) => {
        const prev = state.stocks.find(
          (item) => item.stock.meta.code === stock.meta.code
        )

        return {
          stock,
          history: [...(prev?.history ?? []), stock.price],
        }
      }),
    })),

  selectStock: (code) => {
    set({ selectedStockCode: code })
  },

  resetStocks: () =>
    set({
      stocks: [],
      selectedStockCode: "SAMSON",
    }),
}))
