"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const score = Number(searchParams.get("score")) || 0;
  const total = Number(searchParams.get("total")) || 0;
  const badges = searchParams.get("badges")?.split(",").filter(Boolean) || [];
  const subject = searchParams.get("subject") || "";

  const handleSendEmail = () => {
    const subjectText = encodeURIComponent("Resultado EduGame Carapicuíba");
    const body = encodeURIComponent(
      `Disciplina: ${subject === "math" ? "Matemática" : "Língua Portuguesa"}\n` +
      `Pontuação: ${score}\n` +
      `Total de perguntas: ${total}\n` +
      `Badges conquistados: ${badges.join(", ") || "Nenhum"}\n` +
      `Data: ${new Date().toLocaleDateString("pt-BR")}`
    );
    window.open(`mailto:professor@escola.com?subject=${subjectText}&body=${body}`, "_self");
  };

  return (
    <div className="page-shell flex min-h-[70vh] flex-col items-center justify-center py-8">
      <Card className="animated-card w-full max-w-md border-primary/20 bg-card/80 backdrop-blur-xl">
        <CardHeader className="text-center">
          <div className="mb-2 flex justify-center">
            <span className="animated-pill rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-sm font-semibold text-secondary">
              Parabéns!
            </span>
          </div>
          <CardTitle className="text-3xl font-bold text-primary">🏁 Resultado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-5xl font-bold text-primary">{score}</p>
            <p className="text-muted-foreground">pontos</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {badges.length > 0 ? (
              badges.map((b) => <Badge key={b} variant="secondary" className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">🏅 {b}</Badge>)
            ) : (
              <span className="text-muted-foreground">Nenhum badge conquistado</span>
            )}
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Você acertou {Math.round(score / 10)} de {total} perguntas.
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button onClick={handleSendEmail} className="w-full rounded-2xl bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
            📧 Enviar resultado para o professor
          </Button>
          <Button asChild variant="outline" className="w-full rounded-2xl border-primary/20 bg-background/70 transition-all hover:-translate-y-1 hover:border-primary/40">
            <Link href="/">Voltar ao início</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}