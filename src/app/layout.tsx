import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "EduGame Carapicuíba",
    template: "%s | EduGame Carapicuíba",
  },
  description: "Plataforma gamificada para reforço escolar com desafios, progresso e feedback emocional.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="antialiased flex min-h-dvh flex-col overflow-x-clip">
        <Header />
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
