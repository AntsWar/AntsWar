import {
  ResponsiveContainer,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  type TooltipProps,
} from "recharts"
import { formatTimeToMS } from "@/shared/lib/formatTime"
import { MoneyText } from "@/shared/model/Money"

export function ScoreChart({
  data,
}: {
  data: Array<{ time: number; score: number }>
}) {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="assetGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.5} />
              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} opacity={0.3} />
          <YAxis tickLine={false} axisLine={false} width={"auto"} />
          <Tooltip content={<ScoreTooltip />} />
          <Area
            type="monotone"
            dataKey="score"
            stroke="var(--primary)"
            strokeWidth={3}
            fill="url(#assetGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

function ScoreTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (!active || !payload?.length) {
    return null
  }
  return (
    <div className="rounded-md border bg-popover px-3 py-2">
      <p>{formatTimeToMS(label)}</p>
      <MoneyText money={{ amount: payload[0].value }} />
    </div>
  )
}
