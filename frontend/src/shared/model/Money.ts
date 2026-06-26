export type Money = {
  amount: number
  currency?: string
}

export function MoneyText({ money }: { money?: Money }) {
  const amount = Number(money?.amount ?? 0)
  const currency = money?.currency ?? "KRW"

  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: currency,
    currencyDisplay: "narrowSymbol",
  }).format(amount)
}
