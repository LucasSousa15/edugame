
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
      const newScore = score + 10;
      if (newScore === 20 && !badges.includes("Primeiros passos")) {
        setBadges((prev) => [...prev, "Primeiros passos"]);
      } else if (newScore === 40 && !badges.includes("Aprendiz")) {
        setBadges((prev) => [...prev, "Aprendiz"]);
      } else if (newScore === 60 && !badges.includes("Mestre")) {
        setBadges((prev) => [...prev, "Mestre"]);
      }
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

  return (
    <div className="page-shell flex min-h-[70vh] flex-col items-center justify-center py-8">
      <Card className="animated-card w-full max-w-2xl border-primary/20 bg-card/80 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-2xl font-semibold text-primary">
              {subject === "math" ? "Matemática" : "Língua Portuguesa"}
            </CardTitle>
            <Badge variant="outline" className="rounded-full border-primary/20 bg-primary/10 text-sm text-primary">
              {currentIndex + 1} / {totalQuestions}
            </Badge>
          </div>
          <Progress value={((currentIndex + 1) / totalQuestions) * 100} className="mt-3 h-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg font-medium text-foreground">{currentQuestion.question}</p>
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
        <CardFooter>
          {answered && (
            <Button onClick={handleNext} className="w-full rounded-2xl bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
              {currentIndex < totalQuestions - 1 ? "Próxima pergunta" : "Ver resultado"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}