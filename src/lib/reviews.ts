export type StarRating = 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE';

export type Review = {
  reviewer: { displayName: string };
  starRating: StarRating;
  comment?: string;
  createTime: string;
};

const STAR_TO_NUMBER: Record<StarRating, number> = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

export function starToNumber(s: StarRating): number {
  return STAR_TO_NUMBER[s];
}

export function computeAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + starToNumber(r.starRating), 0);
  return sum / reviews.length;
}

export type StarDistributionBucket = { stars: 1 | 2 | 3 | 4 | 5; count: number };
export type StarDistribution = StarDistributionBucket[]; // toujours 5 buckets (1→5)

export type MonthlyPoint = {
  month: string; // "YYYY-MM" (tri lexicographique == chronologique)
  label: string; // "mai 25" (toLocaleDateString fr-FR, timeZone UTC)
  count: number; // volume du mois — 0 si vide
  average: number | null; // note moyenne du mois — null si vide
};

export type RecentTrend = {
  windowDays: 90;
  recentAverage: number | null;
  recentCount: number;
  globalAverage: number;
  delta: number; // recentAverage - globalAverage
  direction: 'up' | 'down' | 'flat';
  anchorDate: string; // max(createTime) en ISO
};

/** Distribution sur 5 niveaux, niveaux vides inclus (count 0). */
export function computeStarDistribution(reviews: Review[]): StarDistribution {
  const counts = [0, 0, 0, 0, 0];
  for (const r of reviews) {
    counts[starToNumber(r.starRating) - 1] += 1;
  }
  return counts.map((count, i) => ({ stars: (i + 1) as 1 | 2 | 3 | 4 | 5, count }));
}

/** Clé mois suivante, gère le rollover déc→jan. Entrée/sortie "YYYY-MM". */
function nextMonth(key: string): string {
  const [year, month] = key.split('-').map(Number);
  return month === 12
    ? `${year + 1}-01`
    : `${year}-${String(month + 1).padStart(2, '0')}`;
}

/** Libellé fr-FR ("mai 25") déterministe en UTC. Entrée "YYYY-MM". */
function monthLabel(key: string): string {
  return new Date(`${key}-01T00:00:00Z`).toLocaleDateString('fr-FR', {
    month: 'short',
    year: '2-digit',
    timeZone: 'UTC',
  });
}

/** Série mensuelle sur axe continu : mois vide → count 0, average null. */
export function computeMonthlySeries(reviews: Review[]): MonthlyPoint[] {
  if (reviews.length === 0) return [];

  const byMonth = new Map<string, { sum: number; count: number }>();
  for (const r of reviews) {
    const key = r.createTime.slice(0, 7); // UTC, déterministe
    const bucket = byMonth.get(key) ?? { sum: 0, count: 0 };
    bucket.sum += starToNumber(r.starRating);
    bucket.count += 1;
    byMonth.set(key, bucket);
  }

  const keys = [...byMonth.keys()].sort();
  const maxKey = keys[keys.length - 1];

  const points: MonthlyPoint[] = [];
  let key = keys[0];
  while (true) {
    const bucket = byMonth.get(key);
    points.push({
      month: key,
      label: monthLabel(key),
      count: bucket ? bucket.count : 0,
      average: bucket ? bucket.sum / bucket.count : null,
    });
    if (key === maxKey) break;
    key = nextMonth(key);
  }
  return points;
}

/** Note des 90 derniers jours vs moyenne globale, ancrée sur max(createTime). */
export function computeRecentTrend(reviews: Review[]): RecentTrend {
  if (reviews.length === 0) {
    return {
      windowDays: 90,
      recentAverage: null,
      recentCount: 0,
      globalAverage: 0,
      delta: 0,
      direction: 'flat',
      anchorDate: '',
    };
  }

  const globalAverage = computeAverageRating(reviews);
  // Ancre sur la donnée, jamais Date.now() — un export ancien reste analysable.
  const anchorMs = Math.max(...reviews.map((r) => Date.parse(r.createTime)));
  const cutoffMs = anchorMs - 90 * 24 * 60 * 60 * 1000;
  const recent = reviews.filter((r) => Date.parse(r.createTime) >= cutoffMs);
  const recentAverage = recent.length > 0 ? computeAverageRating(recent) : null;
  const delta = recentAverage === null ? 0 : recentAverage - globalAverage;
  // Seuil sous la précision affichée (1 décimale) → pas de faux signal.
  const direction = Math.abs(delta) < 0.05 ? 'flat' : delta > 0 ? 'up' : 'down';

  return {
    windowDays: 90,
    recentAverage,
    recentCount: recent.length,
    globalAverage,
    delta,
    direction,
    anchorDate: new Date(anchorMs).toISOString(),
  };
}
