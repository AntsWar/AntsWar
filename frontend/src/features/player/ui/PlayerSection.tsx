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
    name: "TraderA",
    balance: 125000,
  },
  {
    name: "BullMaster",
    balance: 98000,
  },
  {
    name: "ShortKing",
    balance: 142000,
  },
  {
    name: "CryptoWolf",
    balance: 87000,
  },
  {
    name: "AlphaTrader",
    balance: 110500,
  },
] as Array<Player>
