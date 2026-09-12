import type { Metadata } from "next";

import RankingClient from "./RankingClient";

export const metadata: Metadata = {
  title: "Ranking local",
  description: "Resultados salvos neste dispositivo no protótipo EduGame Carapicuíba.",
};

export default function RankingPage() {
  return <RankingClient />;
}
