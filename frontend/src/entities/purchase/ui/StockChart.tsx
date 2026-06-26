import { formatTimeToMS } from "@/shared/lib/formatTime"
import { MoneyText } from "@/shared/model/Money"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { useStockStore } from "../model/stockStore"
import { TradeButton } from "@/shared/ui/tradeButton"
import {
  useBuyPurchaseMutation,
  type BuyPurchaseVariable,
} from "@/features/market/model/useBuyPurchaseMutation"
import type { BuyPurchaseRequest } from "@/features/market/api/buyPurchase"

export function StockChart() {
  const stocks = useStockStore((state) => state.stocks)
  const selectedStockCode = useStockStore((state) => state.selectedStockCode)

  const stock = stocks.find(
    (item) => item.stock.meta.code === selectedStockCode
  )

  const data =
    stock?.history.map((price, index) => ({
      time: (index + 1) * 3,
      price: price.amount,
    })) ?? []
  const current = data.at(-1)?.price ?? 200
  const previous = data.at(-2)?.price ?? current

  const change = current - previous

  const { mutate, isPending } = useBuyPurchaseMutation()

  const submitOrder = (
    positionType: BuyPurchaseRequest["positionType"],
    quantity: number
  ) => {
    mutate({
      purchase: stock?.stock,
      positionType: positionType,
      quantity: quantity,
    } as BuyPurchaseVariable)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex gap-4 text-xl font-bold">
          <p>{stock?.stock.meta.name}</p>
          <div className="flex gap-2">
            <p>
              <MoneyText money={{ amount: current }} />
            </p>
            <p className={change >= 0 ? "text-stock-up" : "text-stock-down"}>
              (<MoneyText money={{ amount: change }} />)
            </p>
          </div>
        </div>
        {/* <p className="text-sm text-muted-foreground">삼손은 뭐하는 기업일까?</p> */}
      </div>
      <div className="h-56 w-full">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} opacity={0.3} />
            <YAxis
              orientation="right"
              tickLine={false}
              tickCount={5} // 최대 5개 정도의 눈금
              fontSize={12} // 글자 크기
              dataKey="price"
              tickFormatter={(value) =>
                `${MoneyText({ money: { amount: value } })}`
              }
            />
            <XAxis
              type="number"
              domain={["dataMin", "dataMax"]}
              tickLine={false}
              dataKey="time"
              tickCount={5}
              fontSize={12}
              tickFormatter={(value) => `${formatTimeToMS(value)}`}
            />
            <Tooltip content={<StockTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke="var(--primary-foreground)"
              strokeWidth={3}
              fill="url(#stockGradient)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-end gap-4">
        <TradeButton
          label="매수"
          containerClassName="bg-stock-up"
          onClick={(quantity) => {
            submitOrder("LONG", quantity)
          }}
          disabled={isPending}
        />
        <TradeButton
          label="공매도"
          containerClassName="bg-stock-down"
          onClick={(quantity) => {
            submitOrder("SHORT", quantity)
          }}
          disabled={isPending}
        />
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function StockTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) {
    return null
  }
  return (
    <div className="rounded-md border bg-card px-3 py-2">
      <p>{formatTimeToMS(label)}</p>
      <MoneyText money={{ amount: payload[0].value }} />
    </div>
  )
}
