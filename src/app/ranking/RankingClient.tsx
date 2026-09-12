"use client";

import Link from "next/link";
import { Medal, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RankingEntry, RANKING_STORAGE_KEY, readRanking } from "@/lib/ranking";

export default function RankingClient() {
  const [entries, setEntries] = useState<RankingEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setEntries(readRanking(window.localStorage));
      setLoaded(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const clearRanking = () => {
    window.localStorage.removeItem(RANKING_STORAGE_KEY);
    setEntries([]);
  };

  return (
    <div className="page-shell py-6 sm:py-8 lg:py-10">
      <Card className="mx-auto max-w-4xl overflow-hidden border-white/50 bg-white/92 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.3)] backdrop-blur-xl">
        <CardHeader className="gap-3 border-b border-slate-100 p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Badge className="mb-3 rounded-full bg-amber-100 text-amber-900 hover:bg-amber-100">
                Protótipo sem servidor
              </Badge>
              <CardTitle className="flex items-center gap-3 text-3xl font-black text-slate-950">
                <Medal className="size-8 text-amber-500" aria-hidden="true" />
                Ranking local
              </CardTitle>
              <p className="mt-2 max-w-2xl leading-7 text-slate-600">
                Os resultados ficam somente neste navegador. Essa solução demonstra a mecânica de ranking sem coletar dados de crianças em um servidor.
              </p>
            </div>
            {entries.length > 0 ? (
              <Button type="button" variant="outline" className="rounded-full" onClick={clearRanking}>
                <RotateCcw className="mr-2 size-4" aria-hidden="true" />
                Limpar ranking
              </Button>
            ) : null}
          </div>
        </CardHeader>

        <CardContent className="p-5 sm:p-7">
          {!loaded ? (
            <p className="text-slate-600" aria-live="polite">Carregando resultados...</p>
          ) : entries.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <p className="text-lg font-bold text-slate-900">Ainda não há resultados salvos.</p>
              <p className="mt-2 text-slate-600">Conclua uma rodada e salve o resultado para iniciar o ranking.</p>
            </div>
          ) : (
            <ol className="space-y-3" aria-label="Classificação dos resultados deste dispositivo">
              {entries.map((entry, index) => (
                <li key={entry.id} className="grid gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-bold text-slate-950">{entry.studentName}</p>
                    <p className="text-sm text-slate-600">
                      {entry.subject} · {entry.correct} de {entry.total} acertos · {new Date(entry.completedAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-xl font-black text-slate-950">{entry.score} pts</p>
                    <p className="text-sm font-semibold text-slate-500">{entry.accuracy}%</p>
                  </div>
                </li>
              ))}
            </ol>
          )}

          <Button asChild className="mt-6 w-full rounded-2xl bg-slate-950 text-white">
            <Link href="/">Jogar uma nova rodada</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
