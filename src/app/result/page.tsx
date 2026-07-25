import { Suspense } from "react";

import ResultClient from "./ResultClient";

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="py-10 text-center text-muted-foreground">Carregando resultado...</div>}>
      <ResultClient />
    </Suspense>
  );
}
