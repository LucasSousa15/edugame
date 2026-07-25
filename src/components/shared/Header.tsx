import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-2xl border border-primary/10 bg-background/70 px-3 py-2 shadow-sm transition-all hover:-translate-y-px hover:border-primary/20 hover:bg-primary/10"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-lg shadow-md transition-transform group-hover:scale-105">
            🎮
          </span>
          <span className="hidden min-w-0 flex-col leading-tight sm:flex">
            <span className="text-sm font-semibold text-foreground">EduGame Carapicuíba</span>
            <span className="text-xs text-muted-foreground">Aprenda brincando</span>
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild className="rounded-full px-4 py-2 text-sm hover:bg-primary/10">
            <Link href="/">Início</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
