'use client';

import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { RevenueTrendItem } from '@/types/dashboard.type';

interface RevenueTrendChartProps {
  data: RevenueTrendItem[];
}

const RevenueTrendChart = ({ data }: RevenueTrendChartProps) => {
  const chartData = data.map(item => ({
    ...item,
    label: new Date(`${item.date}T00:00:00`).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 p-6 shadow-sm border border-gray-200 dark:border-gray-800"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <BarChart3 size={20} className="text-primary" />
          Revenue Trend
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Revenue from delivered orders — last 14 days
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-gray-200 dark:stroke-gray-800"
            />

            <XAxis
              dataKey="label"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              className="fill-gray-500"
            />

            <YAxis
              fontSize={12}
              tickLine={false}
              axisLine={false}
              className="fill-gray-500"
              tickFormatter={value => `৳${value}`}
            />

            <Tooltip
              formatter={(value: number, name: string) => {
                if (name === 'revenue') {
                  return [`৳${value.toLocaleString()}`, 'Revenue'];
                }

                return [value, 'Orders'];
              }}
              labelFormatter={label => `Date: ${label}`}
            />

            <Bar
              dataKey="revenue"
              fill="#37a78a"
              radius={[4, 4, 0, 0]}
              maxBarSize={45}
              name="revenue"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default RevenueTrendChart;
