
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold text-foreground">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xl shadow-lg">
            🎮
          </span>
          <span className="hidden sm:block">EduGame Carapicuíba</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild className="rounded-full hover:bg-primary/10">
            <Link href="/">Início</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}