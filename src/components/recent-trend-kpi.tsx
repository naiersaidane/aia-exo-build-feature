import type { RecentTrend } from '@/lib/reviews';

type Props = { recentTrend: RecentTrend };

const ARROW_PATH: Record<RecentTrend['direction'], string> = {
  up: 'M12 4l7 8h-4.5v8h-5v-8H5l7-8z',
  down: 'M12 20l-7-8h4.5V4h5v8H19l-7 8z',
  flat: 'M4 12l8-7v4.5h8v5h-8V20l-8-8z',
};

const TrendArrow = ({ direction }: { direction: RecentTrend['direction'] }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden>
    <path d={ARROW_PATH[direction]} />
  </svg>
);

const fmt = (n: number) =>
  n.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export function RecentTrendKpi({ recentTrend }: Props) {
  const { recentAverage, globalAverage, delta, direction, recentCount } = recentTrend;

  const deltaColor =
    direction === 'up'
      ? 'text-aia-blue'
      : direction === 'down'
        ? 'text-signal-orange'
        : 'text-slate-gray';

  const sign = delta > 0 ? '+' : delta < 0 ? '−' : '±';
  const deltaLabel = `${sign}${fmt(Math.abs(delta))}`;
  const directionWord =
    direction === 'up' ? 'en hausse' : direction === 'down' ? 'en baisse' : 'stable';

  const recentLabel = recentAverage === null ? '—' : fmt(recentAverage);
  const ariaLabel =
    recentAverage === null
      ? 'Tendance sur 90 jours indisponible'
      : `Tendance sur 90 jours : note récente ${recentLabel} sur 5, ${directionWord} de ${fmt(Math.abs(delta))} point par rapport à la moyenne globale ${fmt(globalAverage)}, sur ${recentCount} avis.`;

  return (
    <section
      className="flex flex-col items-start justify-between gap-6 rounded-card bg-paper-white p-8 text-left shadow-feature"
      aria-label={ariaLabel}
    >
      <p className="text-body leading-body text-slate-gray">Tendance sur 90&nbsp;jours</p>

      <div className="flex flex-col gap-3">
        <div className="flex items-baseline gap-2 font-medium leading-display tracking-[-0.02em] text-ink-black">
          <span className="text-display">{recentLabel}</span>
          <span className="text-subheading font-normal text-slate-gray">/ 5</span>
        </div>
        <div
          className={`inline-flex items-center gap-1.5 text-body-lg font-medium ${deltaColor}`}
          aria-hidden
        >
          <TrendArrow direction={direction} />
          <span>{deltaLabel}</span>
          <span className="font-normal text-slate-gray">vs {fmt(globalAverage)} de moyenne</span>
        </div>
      </div>

      <p className="text-body leading-body text-slate-gray">
        Sur <span className="text-ink-black">{recentCount}</span> avis des 90 derniers jours
      </p>
    </section>
  );
}
