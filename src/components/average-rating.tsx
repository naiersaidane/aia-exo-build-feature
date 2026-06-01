type Props = { averageRating: number; totalReviews: number };

const StarSvg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 shrink-0">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export function AverageRating({ averageRating, totalReviews }: Props) {
  const fillPercent = (Math.max(0, Math.min(5, averageRating)) / 5) * 100;
  const formatted = averageRating.toLocaleString('fr-FR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const suffix = totalReviews > 1 ? 'reçus' : 'reçu';

  return (
    <section className="flex flex-col items-start justify-between gap-6 rounded-card bg-paper-white p-8 text-left shadow-feature">
      <p className="text-body leading-body text-slate-gray">Note moyenne globale</p>

      <div className="flex flex-col gap-3">
        <div className="flex items-baseline gap-2 font-medium leading-display tracking-[-0.02em] text-ink-black">
          <span className="text-display">{formatted}</span>
          <span className="text-subheading font-normal text-slate-gray">/ 5</span>
        </div>
        <div className="relative inline-flex" aria-label={`Note moyenne ${formatted} sur 5`}>
          <div className="flex gap-1.5 text-frost-gray">
            {[0, 1, 2, 3, 4].map((i) => (
              <StarSvg key={`bg-${i}`} />
            ))}
          </div>
          <div
            className="absolute inset-y-0 left-0 flex gap-1.5 overflow-hidden text-aia-blue"
            style={{ width: `${fillPercent}%` }}
            aria-hidden
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <StarSvg key={`fg-${i}`} />
            ))}
          </div>
        </div>
      </div>

      <p className="text-body leading-body text-slate-gray">
        Calculée sur <span className="text-ink-black">{totalReviews}</span> avis Google {suffix}
      </p>
    </section>
  );
}
