"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Mail } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const themeMap = {
  math: {
    title: "Matematica",
    subtitle: "Gato das contas",
    image: "/assets/mascots/math/greeting.png",
    accent: "from-[#2b68ff] via-[#5ca8ff] to-[#d7ecff]",
    text: "text-[#103b93]",
  },
  port: {
    title: "Portugues",
    subtitle: "Gato da leitura",
    image: "/assets/mascots/port/greeting.png",
    accent: "from-[#ff7a4e] via-[#ffbf65] to-[#fff0d5]",
    text: "text-[#bf4e1e]",
  },
} as const;

export default function ResultClient() {
  const searchParams = useSearchParams();
  const subject = (searchParams.get("subject") || "math") as keyof typeof themeMap;
  const score = Number(searchParams.get("score")) || 0;
  const total = Number(searchParams.get("total")) || 0;
  const correct = Number(searchParams.get("correct")) || Math.round(score / 10);
  const badges = searchParams.get("badges")?.split(",").filter(Boolean) || [];

  const theme = themeMap[subject] ?? themeMap.math;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  const handleSendEmail = () => {
    const subjectText = encodeURIComponent("Resultado EduGame Carapicuiba");
    const body = encodeURIComponent(
      `Disciplina: ${theme.title}\n` +
        `Pontuacao: ${score}\n` +
        `Acertos: ${correct} de ${total}\n` +
        `Aproveitamento: ${accuracy}%\n` +
        `Badges conquistados: ${badges.join(", ") || "Nenhum"}\n` +
        `Data: ${new Date().toLocaleDateString("pt-BR")}`
    );

    window.open(`mailto:professor@escola.com?subject=${subjectText}&body=${body}`, "_self");
  };

  return (
    <div className="page-shell flex items-center justify-center py-6 sm:py-8 lg:py-10">
      <section className={`w-full overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-br ${theme.accent} p-4 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.35)] sm:p-5 lg:p-6`}>
        <Card className="overflow-hidden border-white/20 bg-white/92 backdrop-blur-xl">
          <CardContent className="grid gap-5 p-5 sm:p-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="rounded-[1.6rem] bg-white/70 p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${theme.text}`}>{theme.subtitle}</p>
                  <h1 className="mt-1 text-3xl font-black text-slate-950">Fim da rodada</h1>
                </div>
                <Badge variant="outline" className="rounded-full border-white/40 bg-white/75 text-xs font-semibold text-slate-950">
                  Resultado
                </Badge>
              </div>

              <div className="mt-4 overflow-hidden rounded-[1.4rem] bg-white/60 p-3">
                <Image
                  src={theme.image}
                  alt={theme.title}
                  width={360}
                  height={360}
                  className="mx-auto h-auto w-[78%] drop-shadow-[0_12px_18px_rgba(15,23,42,0.12)]"
                  priority
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Resumo</p>
                <h2 className="text-4xl font-black tracking-tight text-slate-950">{score} pontos</h2>
                <p className="max-w-xl text-base leading-7 text-slate-700">
                  Voce acertou {correct} de {total} perguntas. O gato registrou o resultado da aventura.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {badges.length > 0 ? (
                  badges.map((badge) => (
                    <Badge key={badge} variant="secondary" className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-800">
                      {badge}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-slate-500">Sem badges nesta rodada.</span>
                )}
              </div>

              <div className="rounded-[1.35rem] bg-white/70 p-4">
                <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                  <span>Barra de dominio</span>
                  <span>{accuracy}%</span>
                </div>
                <div className="mt-3 h-3 rounded-full bg-slate-200">
                  <div className="h-3 rounded-full bg-gradient-to-r from-slate-950 via-[#2b68ff] to-[#ff7a4e]" style={{ width: `${accuracy}%` }} />
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 px-5 pb-5 sm:px-7">
            <Button
              onClick={handleSendEmail}
              className="w-full rounded-2xl bg-slate-950 text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-slate-800"
            >
              <Mail className="mr-2 size-4" />
              Enviar resultado ao professor
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full rounded-2xl border-slate-200 bg-white/80 transition-all hover:-translate-y-0.5 hover:bg-slate-50"
            >
              <Link href="/">
                <ArrowLeft className="mr-2 size-4" />
                Voltar ao inicio
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
