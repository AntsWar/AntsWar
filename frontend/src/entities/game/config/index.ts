import type { GameSpec, MoneyValue, TimeValue } from "../model/types"

export const gameSpec: GameSpec = {
  titleMaxLength: 20,
  passwordMaxLength: 10,
}

export const TIME_OPTIONS = [5, 10, 30, 60] as Array<TimeValue>
export const MONEY_OPTIONS = [100, 1000, 10000] as Array<MoneyValue>
