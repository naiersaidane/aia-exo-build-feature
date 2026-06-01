'use client';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { MonthlyPoint } from '@/lib/reviews';
import { CHART, TOOLTIP_CONTENT_STYLE } from './chart-theme';

type Props = { monthly: MonthlyPoint[] };

export function RatingTrendChart({ monthly }: Props) {
  return (
    <section className="flex flex-col gap-6 rounded-card bg-paper-white p-8 shadow-feature">
      <h2 className="text-body font-medium text-ink-black">Évolution de la note</h2>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={monthly} margin={{ top: 8, right: 16, bottom: 0, left: -8 }}>
          <CartesianGrid stroke={CHART.grid} />
          <XAxis
            dataKey="label"
            tick={{ fill: CHART.axis }}
            axisLine={{ stroke: CHART.axisLine }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 5]}
            ticks={[0, 1, 2, 3, 4, 5]}
            tick={{ fill: CHART.axis }}
            axisLine={{ stroke: CHART.axisLine }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={TOOLTIP_CONTENT_STYLE}
            formatter={(value) =>
              typeof value === 'number'
                ? value.toLocaleString('fr-FR', {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  })
                : value
            }
          />
          <Line
            type="monotone"
            dataKey="average"
            name="Note"
            stroke={CHART.primary}
            strokeWidth={2}
            connectNulls={false}
            dot={{ fill: CHART.primary, r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}
