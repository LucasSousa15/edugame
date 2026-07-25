"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, CircleAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { questions } from "@/lib/questions";

const optionLabels = ["A", "B", "C", "D"];

const subjectTheme = {
  math: {
    title: "Matemática",
    subtitle: "O gato das contas",
    colors: "from-[#2b68ff] via-[#5ca8ff] to-[#d7ecff]",
    panel: "bg-[#eaf3ff]",
    text: "text-[#103b93]",
    idle: "/assets/mascots/math/idle.png",
    thinking: "/assets/mascots/math/thinking.png",
    correct: "/assets/mascots/math/walking-correct-answer.png",
    wrong: "/assets/mascots/math/walking-incorrect-answer.png",
  },
  port: {
    title: "Português",
    subtitle: "O gato da leitura",
    colors: "from-[#ff7a4e] via-[#ffbf65] to-[#fff0d5]",
    panel: "bg-[#fff1e7]",
    text: "text-[#bf4e1e]",
    idle: "/assets/mascots/port/idle.png",
    thinking: "/assets/mascots/port/thinking.png",
    correct: "/assets/mascots/port/walking-correct-answer.png",
    wrong: "/assets/mascots/port/walking-incorrect-answer.png",
  },
} as const;

export default function GameClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const subject = searchParams.get("subject") as keyof typeof subjectTheme | null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    if (!subject || !(subject in subjectTheme)) {
      router.replace("/");
    }
  }, [subject, router]);

  const filteredQuestions = useMemo(() => {
    if (!subject || !(subject in subjectTheme)) {
      return [];
    }
    return questions.filter((question) => question.subject === subject);
  }, [subject]);

  const currentQuestion = filteredQuestions[currentIndex];
  const totalQuestions = filteredQuestions.length;
  const theme = subject ? subjectTheme[subject] : subjectTheme.math;
  const progressPercent = totalQuestions > 0 ? ((currentIndex + (answered ? 1 : 0)) / totalQuestions) * 100 : 0;
  const progressState = answered ? (selectedOption === currentQuestion?.correct ? "correct" : "wrong") : currentIndex === 0 ? "idle" : "thinking";

  const handleOptionClick = (index: number) => {
    if (answered || !currentQuestion) return;

    setSelectedOption(index);
    setAnswered(true);

    if (index === currentQuestion.correct) {
      setScore((previous) => previous + 10);
      setCorrectAnswers((previous) => previous + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((previous) => previous + 1);
      setAnswered(false);
      setSelectedOption(null);
      return;
    }

    const badges = [
      correctAnswers >= 2 ? "Primeiros passos" : "",
      correctAnswers >= 4 ? "Aprendiz" : "",
      correctAnswers >= 6 ? "Mestre" : "",
    ].filter(Boolean);

    const params = new URLSearchParams({
      score: String(score),
      correct: String(correctAnswers),
      badges: badges.join(","),
      total: String(totalQuestions),
      subject: subject ?? "math",
    });

    router.push(`/result?${params.toString()}`);
  };

  if (!currentQuestion) {
    return <div className="py-10 text-center text-muted-foreground">Carregando aventura...</div>;
  }

  return (
    <div className="page-shell flex flex-col gap-5 py-6 sm:py-8 lg:py-10">
      <section
        className={`overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-br ${theme.colors} p-4 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.35)] sm:p-5 lg:p-6`}
      >
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className={`rounded-[1.6rem] ${theme.panel} p-4 shadow-sm`}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${theme.text}`}>{theme.subtitle}</p>
                <h1 className="mt-1 text-2xl font-black text-slate-950">{theme.title}</h1>
              </div>
              <Badge variant="outline" className="rounded-full border-white/40 bg-white/70 text-xs font-semibold text-slate-950">
                {currentIndex + 1} / {totalQuestions}
              </Badge>
            </div>

            <div className="relative mt-4 flex h-[186px] items-center justify-center overflow-hidden rounded-[1.4rem] bg-white/55 p-3">
              <div className="relative h-[156px] w-[156px]">
                <Image
                  src={theme[progressState]}
                  alt={theme.title}
                  fill
                  sizes="156px"
                  className="object-contain drop-shadow-[0_12px_18px_rgba(15,23,42,0.12)]"
                  priority
                />
              </div>
            </div>

            <div className="mt-4 rounded-[1.35rem] bg-white/60 p-4">
              <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
                <span>Progresso</span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <div className="relative">
                <Progress value={progressPercent} className="h-3 bg-white/70" />
                <div
                  className="absolute -top-5 transition-all duration-300"
                  style={{ left: `calc(${progressPercent}% - 20px)` }}
                >
                  <div className="relative h-10 w-10 rounded-full border border-white/70 bg-white/85 p-1 shadow-[0_8px_18px_-10px_rgba(15,23,42,0.35)]">
                    <Image
                      src={theme[progressState]}
                      alt={`${theme.title} progresso`}
                      fill
                      sizes="40px"
                      className="object-contain drop-shadow-[0_6px_10px_rgba(15,23,42,0.16)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Card className="overflow-hidden border-white/20 bg-white/92 backdrop-blur-xl">
            <CardHeader className="space-y-3 px-5 pt-5 sm:px-7 sm:pt-7">
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-2xl font-black text-slate-950">Quiz</CardTitle>
                <span className="rounded-full bg-slate-950/5 px-3 py-1 text-xs font-semibold text-slate-700">
                  {score} pontos
                </span>
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Desafio da rodada</p>
              <p className="text-xl font-semibold leading-relaxed text-slate-950 sm:text-2xl">{currentQuestion.question}</p>
            </CardHeader>

            <CardContent className="space-y-3 px-5 pb-5 pt-0 sm:px-7">
              {currentQuestion.options.map((option, index) => {
                const isCorrect = answered && index === currentQuestion.correct;
                const isWrong = answered && index === selectedOption && index !== currentQuestion.correct;

                return (
                  <Button
                    key={option}
                    variant="outline"
                    className={`h-auto w-full justify-start rounded-[1.2rem] border px-4 py-4 text-left transition-all ${
                      isCorrect
                        ? "border-emerald-300 bg-emerald-50 text-slate-950"
                        : isWrong
                          ? "border-rose-300 bg-rose-50 text-slate-950"
                          : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                    onClick={() => handleOptionClick(index)}
                    disabled={answered}
                  >
                    <span className="mr-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white">
                      {optionLabels[index]}
                    </span>
                    <span className="flex-1 text-base font-medium leading-6">{option}</span>
                    {isCorrect && <CheckCircle2 className="ml-3 size-5 text-emerald-600" />}
                    {isWrong && <CircleAlert className="ml-3 size-5 text-rose-600" />}
                  </Button>
                );
              })}
            </CardContent>

            <CardFooter className="px-5 pb-5 sm:px-7">
              {answered && (
                <Button
                  onClick={handleNext}
                  className="w-full rounded-2xl bg-slate-950 text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  {currentIndex < totalQuestions - 1 ? "Próxima pergunta" : "Ver resultado"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
