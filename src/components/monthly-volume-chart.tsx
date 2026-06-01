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
import type { MonthlyPoint } from '@/lib/reviews';
import { CHART, TOOLTIP_CONTENT_STYLE } from './chart-theme';

type Props = { monthly: MonthlyPoint[] };

export function MonthlyVolumeChart({ monthly }: Props) {
  return (
    <section className="flex flex-col gap-6 rounded-card bg-paper-white p-8 shadow-feature">
      <h2 className="text-body font-medium text-ink-black">Volume mensuel des avis</h2>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={monthly} margin={{ top: 8, right: 16, bottom: 0, left: -8 }}>
          <CartesianGrid stroke={CHART.grid} vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: CHART.axis }}
            axisLine={{ stroke: CHART.axisLine }}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: CHART.axis }}
            axisLine={{ stroke: CHART.axisLine }}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: CHART.secondary, opacity: 0.3 }}
            contentStyle={TOOLTIP_CONTENT_STYLE}
          />
          <Bar dataKey="count" name="Avis" fill={CHART.secondary} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
