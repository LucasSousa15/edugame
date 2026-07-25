import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const choices = [
  {
    href: "/game?subject=math",
    title: "Matemática",
    description: "Entrar direto no desafio.",
    image: "/assets/mascots/math.png",
    accent: "from-[#2d74ff] via-[#78bfff] to-[#d7ecff]",
    glow: "bg-[#4a84ff]/25",
  },
  {
    href: "/game?subject=port",
    title: "Português",
    description: "Começar pela leitura.",
    image: "/assets/mascots/port.png",
    accent: "from-[#ff7b4d] via-[#ffbf6f] to-[#ffe8c8]",
    glow: "bg-[#ff8e5c]/25",
  },
];

export default function Home() {
  return (
    <div className="page-shell flex items-center justify-center py-4 sm:py-6 lg:py-8">
      <section className="relative w-full overflow-hidden rounded-[2rem] border border-white/20 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.24),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(255,187,96,0.18),_transparent_34%),linear-gradient(135deg,_#1852d6_0%,_#2f7ff7_40%,_#7ac7ff_68%,_#ffd78f_100%)] px-5 py-6 shadow-[0_24px_80px_-24px_rgba(24,82,214,0.55)] sm:px-7 sm:py-8 lg:px-10 lg:py-10">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-6 top-10 h-24 w-24 rounded-full bg-white/30 blur-3xl" />
          <div className="absolute bottom-8 right-10 h-28 w-28 rounded-full bg-[#ffe08f]/40 blur-3xl" />
        </div>

        <div className="relative grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-4 text-white">
            <span className="inline-flex w-fit rounded-full border border-white/20 bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] backdrop-blur">
              Aventura dos gatos educadores
            </span>

            <div className="space-y-3">
              <h1 className="max-w-md text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Escolha uma matéria e jogue.
              </h1>
              <p className="max-w-lg text-base leading-7 text-white/88 sm:text-lg">
                A entrada é direta. Um toque e o quiz começa.
              </p>
            </div>
          </div>

          <div className="grid items-stretch gap-4 sm:grid-cols-2">
            {choices.map((choice) => (
              <Button
                key={choice.title}
                asChild
                size="lg"
                className="h-full justify-start rounded-[1.6rem] border-0 bg-transparent px-0 py-0 shadow-none"
              >
                <Link
                  href={choice.href}
                  className={`group relative flex min-h-[300px] h-full w-full flex-col justify-between overflow-hidden rounded-[1.6rem] bg-gradient-to-br ${choice.accent} p-5 text-left text-slate-950 shadow-[0_18px_45px_-18px_rgba(15,23,42,0.38)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_22px_55px_-18px_rgba(15,23,42,0.5)]`}
                >
                  <div className={`absolute inset-x-0 top-0 h-20 ${choice.glow} blur-3xl`} />
                  <div className="relative flex flex-1 items-center justify-center py-3">
                    <Image
                      src={choice.image}
                      alt={choice.title}
                      width={220}
                      height={220}
                      unoptimized
                      className="h-[176px] w-[176px] object-contain drop-shadow-[0_12px_22px_rgba(15,23,42,0.18)]"
                    />
                  </div>
                  <div className="relative min-h-[92px] flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-black">{choice.title}</h2>
                      <p className="mt-1 text-sm leading-6 text-slate-800/80">{choice.description}</p>
                    </div>
                    <ArrowRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
