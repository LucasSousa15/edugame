export type RankingEntry = {
  id: string;
  studentName: string;
  subject: string;
  score: number;
  correct: number;
  total: number;
  accuracy: number;
  completedAt: string;
};

export const RANKING_STORAGE_KEY = "edugame-carapicuiba-ranking-v1";

const byPerformance = (left: RankingEntry, right: RankingEntry) =>
  right.score - left.score ||
  right.accuracy - left.accuracy ||
  new Date(right.completedAt).getTime() - new Date(left.completedAt).getTime();

const isRankingEntry = (value: unknown): value is RankingEntry => {
  if (!value || typeof value !== "object") return false;

  const entry = value as Partial<RankingEntry>;
  return (
    typeof entry.id === "string" &&
    typeof entry.studentName === "string" &&
    typeof entry.subject === "string" &&
    typeof entry.score === "number" &&
    typeof entry.correct === "number" &&
    typeof entry.total === "number" &&
    typeof entry.accuracy === "number" &&
    typeof entry.completedAt === "string"
  );
};

export function readRanking(storage: Storage | null): RankingEntry[] {
  if (!storage) return [];

  try {
    const parsed: unknown = JSON.parse(storage.getItem(RANKING_STORAGE_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isRankingEntry).sort(byPerformance).slice(0, 20);
  } catch {
    return [];
  }
}

export function saveRankingEntry(
  storage: Storage,
  entry: Omit<RankingEntry, "id" | "completedAt">,
): RankingEntry[] {
  const completedAt = new Date().toISOString();
  const savedEntry: RankingEntry = {
    ...entry,
    studentName: entry.studentName.trim().slice(0, 80),
    id: `${completedAt}-${Math.random().toString(36).slice(2, 8)}`,
    completedAt,
  };

  const ranking = [savedEntry, ...readRanking(storage)].sort(byPerformance).slice(0, 20);
  storage.setItem(RANKING_STORAGE_KEY, JSON.stringify(ranking));
  return ranking;
}
