"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Mail, Save, Trophy } from "lucide-react";
import { useForm } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { saveRankingEntry } from "@/lib/ranking";

const themeMap = {
  math: {
    title: "Matemática",
    subtitle: "Gato das contas",
    image: "/assets/mascots/math/greeting.png",
    accent: "from-[#2b68ff] via-[#5ca8ff] to-[#d7ecff]",
    text: "text-[#103b93]",
  },
  port: {
    title: "Português",
    subtitle: "Gato da leitura",
    image: "/assets/mascots/port/greeting.png",
    accent: "from-[#ff7a4e] via-[#ffbf65] to-[#fff0d5]",
    text: "text-[#bf4e1e]",
  },
} as const;

type FormValues = {
  studentName: string;
  teacherName: string;
};

export default function ResultClient() {
  const searchParams = useSearchParams();
  const subject = (searchParams.get("subject") || "math") as keyof typeof themeMap;
  const score = Number(searchParams.get("score")) || 0;
  const total = Number(searchParams.get("total")) || 0;
  const correct = Number(searchParams.get("correct")) || Math.round(score / 10);
  const badges = searchParams.get("badges")?.split(",").filter(Boolean) || [];

  const theme = themeMap[subject] ?? themeMap.math;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      studentName: "",
      teacherName: "",
    },
  });

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const saveResultLocally = async () => {
    if (isSaved || !(await trigger("studentName"))) return;

    saveRankingEntry(window.localStorage, {
      studentName: getValues("studentName"),
      subject: theme.title,
      score,
      total,
      correct,
      accuracy,
    });
    setIsSaved(true);
    setStatusMessage("Resultado salvo no ranking deste dispositivo.");
  };

  const onSubmit = async (data: FormValues) => {
    const payload = {
      studentName: data.studentName,
      teacherName: data.teacherName,
      subject: theme.title,
      score,
      total,
      correct,
      accuracy,
      badges,
    };

    try {
      if (!isSaved) {
        saveRankingEntry(window.localStorage, {
          studentName: data.studentName,
          subject: theme.title,
          score,
          total,
          correct,
          accuracy,
        });
        setIsSaved(true);
      }
      setStatusMessage("Enviando resultado...");
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Falha ao enviar o email");
      }

      setStatusMessage("Resultado enviado com sucesso!");
      setIsSent(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro desconhecido";
      setStatusMessage(message);
    }
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
                  loading="eager"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Resumo</p>
                <h2 className="text-4xl font-black tracking-tight text-slate-950">{score} pontos</h2>
                <p className="max-w-xl text-base leading-7 text-slate-700">
                  Você acertou {correct} de {total} perguntas. O gato registrou o resultado da aventura.
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
                  <span>Barra de domínio</span>
                  <span>{accuracy}%</span>
                </div>
                <div className="mt-3 h-3 rounded-full bg-slate-200">
                  <div className="h-3 rounded-full bg-gradient-to-r from-slate-950 via-[#2b68ff] to-[#ff7a4e]" style={{ width: `${accuracy}%` }} />
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-[1.35rem] bg-white/80 p-4 shadow-sm">
                <div>
                  <p className="text-sm font-bold text-slate-900">Registrar a atividade</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Salve no ranking local ou, se o envio estiver configurado, compartilhe o relatório com o professor definido pela escola.
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="studentName">
                    Nome do aluno
                  </label>
                  <input
                    id="studentName"
                    {...register("studentName", { required: "Informe o nome do aluno" })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Nome do aluno"
                  />
                  {errors.studentName && (
                    <p className="mt-2 text-xs text-destructive">{errors.studentName.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="teacherName">
                    Nome do professor <span className="font-normal text-slate-500">(para envio)</span>
                  </label>
                  <input
                    id="teacherName"
                    {...register("teacherName", { required: "Informe o nome do professor" })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Nome do professor"
                  />
                  {errors.teacherName && (
                    <p className="mt-2 text-xs text-destructive">{errors.teacherName.message}</p>
                  )}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-2xl border-slate-300 bg-white"
                  disabled={isSaved}
                  onClick={saveResultLocally}
                >
                  <Save className="mr-2 size-4" aria-hidden="true" />
                  {isSaved ? "Salvo no ranking" : "Salvar no ranking deste dispositivo"}
                </Button>

                <Button type="submit" className="w-full rounded-2xl bg-slate-950 text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-slate-800" disabled={isSubmitting || isSent}>
                  <Mail className="mr-2 size-4" />
                  {isSent ? "Enviado" : "Enviar ao professor configurado"}
                </Button>
                {statusMessage ? (
                  <p className="text-sm text-slate-700" aria-live="polite">{statusMessage}</p>
                ) : null}
              </form>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 px-5 pb-5 sm:px-7">
            <Button
              asChild
              variant="outline"
              className="w-full rounded-2xl border-slate-200 bg-white/80 transition-all hover:-translate-y-0.5 hover:bg-slate-50"
            >
              <Link href="/ranking">
                <Trophy className="mr-2 size-4" aria-hidden="true" />
                Ver ranking local
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full rounded-2xl border-slate-200 bg-white/80 transition-all hover:-translate-y-0.5 hover:bg-slate-50"
            >
              <Link href="/">
                <ArrowLeft className="mr-2 size-4" />
                Voltar ao início
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
