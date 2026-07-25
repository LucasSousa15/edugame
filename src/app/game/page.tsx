"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { questions } from "@/lib/questions";

export default function GamePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const subject = searchParams.get("subject") as "math" | "port" | null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [progressStep, setProgressStep] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);

  useEffect(() => {
    if (!subject || (subject !== "math" && subject !== "port")) {
      router.push("/");
    }
  }, [subject, router]);

  const filteredQuestions = useMemo(() => {
    if (!subject || (subject !== "math" && subject !== "port")) {
      return [];
    }
    return questions.filter((q) => q.subject === subject);
  }, [subject]);

  const currentQuestion = filteredQuestions[currentIndex];
  const totalQuestions = filteredQuestions.length;

  const handleOptionClick = (index: number) => {
    if (answered) return;
    setSelectedOption(index);
    setAnswered(true);
    if (index === currentQuestion.correct) {
      setScore((prev) => prev + 10);
      setProgressStep((prev) => Math.min(prev + 1, totalQuestions));
      const newScore = score + 10;
      if (newScore === 20 && !badges.includes("Primeiros passos")) {
        setBadges((prev) => [...prev, "Primeiros passos"]);
      } else if (newScore === 40 && !badges.includes("Aprendiz")) {
        setBadges((prev) => [...prev, "Aprendiz"]);
      } else if (newScore === 60 && !badges.includes("Mestre")) {
        setBadges((prev) => [...prev, "Mestre"]);
      }
    } else {
      setProgressStep((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setAnswered(false);
      setSelectedOption(null);
    } else {
      const params = new URLSearchParams({
        score: String(score),
        badges: badges.join(","),
        total: String(totalQuestions),
        subject: subject!,
      });
      router.push(`/result?${params.toString()}`);
    }
  };

  if (!currentQuestion) {
    return <div className="py-8 text-center text-muted-foreground">Carregando...</div>;
  }

  const characterPosition = totalQuestions > 0 ? (progressStep / totalQuestions) * 100 : 0;

  return (
    <div className="page-shell flex flex-col items-center justify-center py-8 sm:py-10">
      <Card className="animated-card w-full max-w-3xl overflow-hidden border-primary/20 bg-card/80 backdrop-blur-xl">
        <CardHeader className="space-y-4 px-6 pt-6 sm:px-8 sm:pt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-2xl font-semibold text-primary">
              {subject === "math" ? "Matemática" : "Língua Portuguesa"}
            </CardTitle>
            <Badge variant="outline" className="self-start rounded-full border-primary/20 bg-primary/10 text-sm text-primary sm:self-auto">
              {currentIndex + 1} / {totalQuestions}
            </Badge>
          </div>
          <div className="rounded-[1.5rem] border border-primary/15 bg-background/80 p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
              <span>Progresso</span>
              <span>
                {progressStep} / {totalQuestions}
              </span>
            </div>
            <div className="relative h-4 rounded-full bg-border/20">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-secondary"
                style={{ width: `${characterPosition}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 rounded-full border border-border/80 bg-background px-2 py-1 text-sm shadow-md"
                style={{ left: `calc(${characterPosition}% - 0.75rem)` }}
              >
                🐾
              </div>
            </div>
          </div>
          <Progress value={((currentIndex + 1) / totalQuestions) * 100} className="h-2" />
        </CardHeader>
        <CardContent className="space-y-6 px-6 pb-6 pt-0 sm:px-8">
          <p className="text-lg font-medium leading-relaxed text-foreground">{currentQuestion.question}</p>
          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((option, idx) => {
              const isCorrect = answered && idx === currentQuestion.correct;
              const isWrong = answered && idx === selectedOption && idx !== currentQuestion.correct;

              return (
                <Button
                  key={idx}
                  variant="outline"
                  className={`h-auto justify-start px-4 py-3 text-left transition-all duration-200 ${
                    isCorrect
                      ? "border-secondary bg-secondary/15 shadow-md"
                      : isWrong
                        ? "border-destructive/40 bg-destructive/10"
                        : "border-border/70 bg-background/70 hover:-translate-y-1 hover:border-primary/40"
                  }`}
                  onClick={() => handleOptionClick(idx)}
                  disabled={answered}
                >
                  {option}
                </Button>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
            <span>Pontuação: {score}</span>
            {badges.length > 0 && <span>🏅 {badges.join(", ")}</span>}
          </div>
        </CardContent>
        <CardFooter className="px-6 pb-6 sm:px-8">
          {answered && (
            <Button
              onClick={handleNext}
              className="w-full rounded-2xl bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              {currentIndex < totalQuestions - 1 ? "Próxima pergunta" : "Ver resultado"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
