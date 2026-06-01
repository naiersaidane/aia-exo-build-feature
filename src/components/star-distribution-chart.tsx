'use client';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { StarDistribution } from '@/lib/reviews';
import { CHART, TOOLTIP_CONTENT_STYLE } from './chart-theme';

type Props = { distribution: StarDistribution };

export function StarDistributionChart({ distribution }: Props) {
  // 5★ en haut, 1★ en bas : lecture naturelle de la distribution.
  const data = [...distribution]
    .reverse()
    .map((b) => ({ label: `${b.stars}★`, count: b.count }));

  return (
    <section className="flex flex-col gap-6 rounded-card bg-paper-white p-8 shadow-feature">
      <h2 className="text-body font-medium text-ink-black">Répartition des notes</h2>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 0, right: 16, bottom: 0, left: 0 }}
        >
          <CartesianGrid stroke={CHART.grid} horizontal={false} />
          <XAxis
            type="number"
            allowDecimals={false}
            tick={{ fill: CHART.axis }}
            axisLine={{ stroke: CHART.axisLine }}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="label"
            width={36}
            tick={{ fill: CHART.axis }}
            axisLine={{ stroke: CHART.axisLine }}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: CHART.secondary, opacity: 0.3 }}
            contentStyle={TOOLTIP_CONTENT_STYLE}
          />
          <Bar dataKey="count" name="Avis" fill={CHART.primary} radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
