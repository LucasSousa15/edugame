import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="page-shell flex items-center justify-center py-8 sm:py-10 lg:py-14">
      <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-0">
        <div className="min-h-[520px] rounded-[2.25rem] border border-primary/10 bg-background/90 p-5 shadow-2xl backdrop-blur-xl sm:p-6 md:p-8">
          <div className="mx-auto mb-8 flex max-w-2xl flex-col gap-2 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">Escolha um desafio</p>
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">Vamos jogar?</h1>
          </div>

          <div className="grid gap-5">
            <Button
              asChild
              size="lg"
              className="w-full min-h-[180px] rounded-[1.8rem] border border-secondary/20 bg-gradient-to-r from-secondary/20 via-background/90 to-secondary/10 px-5 py-6 text-secondary-foreground shadow-lg transition duration-200 hover:shadow-xl sm:px-6 sm:py-8"
            >
              <Link
                href="/game?subject=port"
                className="flex h-full flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:justify-start sm:text-left"
              >
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-secondary/20 text-4xl shadow-sm">
                  📖
                </div>
                <div className="flex-1">
                  <p className="text-3xl font-semibold text-foreground">Português</p>
                  <p className="mt-2 max-w-md text-sm text-muted-foreground">
                    Revise leitura, interpretação e vocabulário com uma trilha leve e direta.
                  </p>
                </div>
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              className="w-full min-h-[180px] rounded-[1.8rem] border border-primary/20 bg-gradient-to-r from-primary/20 via-background/90 to-primary/10 px-5 py-6 text-primary-foreground shadow-lg transition duration-200 hover:shadow-xl sm:px-6 sm:py-8"
            >
              <Link
                href="/game?subject=math"
                className="flex h-full flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:justify-start sm:text-left"
              >
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-primary/20 text-4xl shadow-sm">
                  ➕
                </div>
                <div className="flex-1">
                  <p className="text-3xl font-semibold text-foreground">Matemática</p>
                  <p className="mt-2 max-w-md text-sm text-muted-foreground">
                    Treine contas, raciocínio e resolução de problemas em etapas curtas.
                  </p>
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
