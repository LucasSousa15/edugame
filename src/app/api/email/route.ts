import { NextResponse } from "next/server";
import { sendScoreEmail } from "@/app/service/email/service";
import type { ScoreEmailPayload } from "@/app/service/email/service";

const allowedSubjects = new Set(["Matemática", "Português"]);
const allowedBadges = new Set(["Primeiros passos", "Aprendiz", "Mestre"]);

function isValidPayload(value: unknown): value is ScoreEmailPayload {
  if (!value || typeof value !== "object") return false;

  const payload = value as Partial<ScoreEmailPayload>;
  const expectedBadges = [
    payload.correct !== undefined && payload.correct >= 2 ? "Primeiros passos" : "",
    payload.correct !== undefined && payload.correct >= 4 ? "Aprendiz" : "",
    payload.correct !== undefined && payload.correct >= 6 ? "Mestre" : "",
  ].filter(Boolean);

  return (
    typeof payload.studentName === "string" &&
    payload.studentName.trim().length > 0 &&
    payload.studentName.length <= 80 &&
    typeof payload.teacherName === "string" &&
    payload.teacherName.trim().length > 0 &&
    payload.teacherName.length <= 80 &&
    typeof payload.subject === "string" &&
    allowedSubjects.has(payload.subject) &&
    typeof payload.score === "number" &&
    Number.isFinite(payload.score) &&
    typeof payload.total === "number" &&
    Number.isInteger(payload.total) &&
    payload.total === 10 &&
    typeof payload.correct === "number" &&
    Number.isInteger(payload.correct) &&
    payload.correct >= 0 &&
    payload.correct <= payload.total &&
    typeof payload.accuracy === "number" &&
    payload.accuracy >= 0 &&
    payload.accuracy <= 100 &&
    payload.score === payload.correct * 10 &&
    payload.accuracy === Math.round((payload.correct / payload.total) * 100) &&
    Array.isArray(payload.badges) &&
    payload.badges.length <= 3 &&
    payload.badges.every((badge) => typeof badge === "string" && allowedBadges.has(badge)) &&
    payload.badges.length === expectedBadges.length &&
    payload.badges.every((badge, index) => badge === expectedBadges[index])
  );
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "O corpo da requisição não é um JSON válido." }, { status: 400 });
  }

  try {
    if (!isValidPayload(body)) {
      return NextResponse.json(
        { error: "Dados do resultado inválidos." },
        { status: 400 }
      );
    }

    await sendScoreEmail({
      ...body,
      studentName: body.studentName.trim(),
      teacherName: body.teacherName.trim(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Não foi possível enviar o resultado.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
