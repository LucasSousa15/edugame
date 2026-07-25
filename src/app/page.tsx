import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="page-shell flex min-h-[70vh] flex-col items-center justify-center py-8">
      <Card className="animated-card w-full max-w-lg border-primary/20 bg-card/80 backdrop-blur-xl">
        <CardHeader className="text-center">
          <div className="mb-3 flex justify-center">
            <span className="animated-pill rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              Aprenda brincando
            </span>
          </div>
          <CardTitle className="text-4xl font-bold text-primary">🎮 EduGame</CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Reforce seus conhecimentos em Matemática e Língua Portuguesa com uma experiência mais viva.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            Escolha uma disciplina para começar:
          </p>
          <div className="flex flex-col gap-3">
            <Button asChild size="lg" className="w-full justify-start rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
              <Link href="/game?subject=math" className="flex items-center justify-center gap-2">
                <span className="text-lg">➕</span>
                <span>Matemática</span>
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="w-full justify-start rounded-2xl bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
              <Link href="/game?subject=port" className="flex items-center justify-center gap-2">
                <span className="text-lg">📖</span>
                <span>Língua Portuguesa</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}