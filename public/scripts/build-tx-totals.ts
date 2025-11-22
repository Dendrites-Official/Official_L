// scripts/build-tx-totals.ts
// Generate a conservative lower-bound JSON for 2024 annual tx + losses.
// This version uses static (defensible) lower-bounds. You can later
// replace `DAILY` with true explorer API pulls if you add API keys.

import fs from "node:fs";
import path from "node:path";

type Net = { key: string; label: string; dailyTxAvg: number };
type AnnualData = { networks: Net[]; hacksUSD: number; scamsUSD: number };

const OUT_DIR = path.resolve(process.cwd(), "public", "data");
const OUT_FILE = path.join(OUT_DIR, "annual-tx-lb.json");

// Conservative daily averages (see component comments)
const DAILY: Net[] = [
  { key: "ethereum", label: "Ethereum (L1)", dailyTxAvg: 1_560_000 },
  { key: "bsc",      label: "BNB Smart Chain", dailyTxAvg: 4_000_000 },
  { key: "arbitrum", label: "Arbitrum One",    dailyTxAvg: 2_500_000 },
  { key: "base",     label: "Base",            dailyTxAvg: 1_600_000 },
  { key: "polygon",  label: "Polygon PoS",     dailyTxAvg: 2_000_000 },
];

const HACKS_2024_USD = 2_200_000_000;
const SCAMS_2024_USD = 9_900_000_000;

const payload: AnnualData = {
  networks: DAILY,
  hacksUSD: HACKS_2024_USD,
  scamsUSD: SCAMS_2024_USD,
};

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(payload, null, 2), "utf-8");

console.log(`✓ Wrote ${OUT_FILE}`);
