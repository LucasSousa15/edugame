import Link from "next/link";
import { Gamepad2, Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/60 bg-white/80 text-slate-700 backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 rounded-2xl px-2 py-1 transition-colors hover:bg-slate-100">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white shadow-sm">
            <Gamepad2 className="size-4" />
          </span>
          <span className="hidden min-w-0 flex-col leading-tight sm:flex">
            <span className="text-sm font-semibold text-slate-900">EduGame Carapicuíba</span>
            <span className="text-xs text-slate-500">Aprenda brincando</span>
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild className="rounded-full px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900">
            <Link href="/ranking">
              <Trophy className="mr-2 size-4" aria-hidden="true" />
              Ranking
            </Link>
          </Button>
          <Button variant="ghost" asChild className="rounded-full px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900">
            <Link href="/">Início</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
