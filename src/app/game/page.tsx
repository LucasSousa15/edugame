import { Suspense } from "react";

import GameClient from "./GameClient";

export default function GamePage() {
  return (
    <Suspense
      fallback={<div className="py-10 text-center text-muted-foreground">Carregando aventura...</div>}
    >
      <GameClient />
    </Suspense>
  );
}
