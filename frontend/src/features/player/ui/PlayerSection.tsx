import { PlayerTable, type Player } from "@/entities/player"

export default function PlayerSection() {
  const sorted = [...players].sort((a, b) => b.balance - a.balance)

  return (
    <section>
      <PlayerTable players={sorted} />
    </section>
  )
}

const players = [
  {
    id: 1,
    name: "TraderA",
    balance: 125000,
  },
  {
    id: 2,
    name: "BullMaster",
    balance: 98000,
  },
  {
    id: 3,
    name: "ShortKing",
    balance: 142000,
  },
  {
    id: 4,
    name: "CryptoWolf",
    balance: 87000,
  },
  {
    id: 5,
    name: "AlphaTrader",
    balance: 110500,
  },
] as Array<Player>
