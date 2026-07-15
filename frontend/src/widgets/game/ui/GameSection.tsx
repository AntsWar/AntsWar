import { MoneyText } from "@/shared/model/Money"
import { MarketInfo, PortfolioInfo, StockChart } from "@/features/market"
import { type Game } from "@/entities/game"
import { NewsBanner, NewsHistoryCard } from "@/entities/news"
import { RumorHistoryCard } from "@/entities/rumors/ui/RumorHistoryCard"
import { ItemShop } from "@/features/itemShop"
import { useMeQuery } from "@/entities/player"
import { Card, WideCard } from "@/shared/ui/card"
import RemainingTime from "@/features/game/remainingTime"
import SectionHeader from "./SectionHeader"
import Clock from "@/assets/icon/clock.svg?react"
import MoneyBag from "@/assets/icon/moneyBag.svg?react"
import Coin from "@/assets/icon/coin.svg?react"
import Chart from "@/assets/icon/chart.svg?react"
import PieChart from "@/assets/icon/pieChart.svg?react"
import Store from "@/assets/icon/store.svg?react"
import Mail from "@/assets/icon/mail.svg?react"
import NewsPaper from "@/assets/icon/newsPaper.svg?react"

export default function GameSection({ game }: { game: Game }) {
  const { data: me } = useMeQuery()

  return (
    <div className="flex h-full min-h-0 flex-col gap-2 overflow-x-hidden">
      <WideCard
        size="lg"
        className="w-full rounded-md md:rounded-lg lg:rounded-xl"
      >
        <div className="flex w-full gap-4 overflow-x-auto overflow-y-hidden">
          <div className="flex min-w-max flex-1 items-center gap-2">
            <Clock className="size-10" />
            <div>
              <span>진행 시간</span>
              <RemainingTime />
            </div>
          </div>
          <div className="flex min-w-max flex-1 items-center gap-2">
            <Coin className="size-10" />
            <div>
              <span className="">현금</span>
              <p className="text-xl font-bold">
                <MoneyText money={me?.player.balance} />
              </p>
            </div>
          </div>
          <div className="flex min-w-max flex-1 items-center gap-2">
            <MoneyBag className="size-10" />
            <div>
              <span className="">총 자산</span>
              <p className="text-xl font-bold">
                <MoneyText money={me?.player.asset} />
              </p>
            </div>
          </div>
          <div className="flex min-w-max flex-1 items-center gap-2">
            <img src="/player.png" className="size-10" />
            <div>
              <span className="">이름</span>
              <p className="text-xl font-bold">{me?.player.name}</p>
            </div>
          </div>
        </div>
      </WideCard>

      <div className="flex-1 space-y-4 overflow-y-auto">
        <NewsBanner />
        <Card size="lg" className="w-full rounded-xl">
          <div className="space-y-8">
            <div className="w-full space-y-4">
              <SectionHeader
                icon={<Chart className="size-8" />}
                title="장터 시세판"
                description="가격의 변동성을 알 수 있어요"
              />
              <StockChart />
            </div>
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="w-full space-y-4">
                <SectionHeader
                  icon={<Chart className="size-8" />}
                  title="장터"
                  description={
                    <>
                      가격이 <MoneyText money={{ amount: 100 }} /> 아래로
                      떨어지면 상폐됩니다.
                    </>
                  }
                />
                <MarketInfo purchases={game.purchases ?? []} />
              </div>
              <div className="w-full space-y-4">
                <SectionHeader
                  icon={<PieChart className="size-7" />}
                  title="포트폴리오"
                  description="상장폐지된 종목은 자동으로 청산됩니다."
                />
                <PortfolioInfo
                  positions={me?.positions ?? []}
                  purchases={game.purchases ?? []}
                />
              </div>
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex-1">
            <Card size="md" className="w-full rounded-xl">
              <div className="space-y-4">
                <SectionHeader
                  icon={<NewsPaper className="size-7" />}
                  title="뉴스"
                  description="뉴스는 특정 종목의 가격에 영향을 끼칩니다."
                />
                <NewsHistoryCard />
              </div>
            </Card>
          </div>
          <div className="flex-1">
            <Card size="md" className="w-full rounded-xl">
              <div className="space-y-4">
                <SectionHeader
                  icon={<Mail className="size-7" />}
                  title="찌라시"
                  description="다음 뉴스에 대한 힌트를 얻을 수 있습니다. "
                />
                <RumorHistoryCard />
              </div>
            </Card>
          </div>
        </div>

        <Card size="md" className="w-full rounded-xl">
          <div className="space-y-4">
            <SectionHeader
              icon={<Store className="size-7" />}
              title="상점"
              description="아이템을 살 수 있습니다."
            />
            <ItemShop />
          </div>
        </Card>
      </div>
    </div>
  )
}
