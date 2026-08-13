'use client';

import { OrderByStatus } from '@/types/dashboard.type';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

interface OrdersByStatusChartProps {
  data: OrderByStatus[];
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: '#f59e0b',
  SHIPPED: '#8b5cf6',
  DELIVERED: '#22c55e',
  CANCELLED: '#ef4444',
  PARTIAL: '#3b82f6',
};

const OrdersByStatusChart = ({ data }: OrdersByStatusChartProps) => {
  const totalOrders = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="bg-white dark:bg-gray-900 p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Orders by Status
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Current order distribution
        </p>
      </div>

      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={3}
            >
              {data.map(item => (
                <Cell key={item.status} fill={STATUS_COLORS[item.status]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {totalOrders}
          </span>

          <span className="text-xs text-gray-500 dark:text-gray-400">
            Orders
          </span>
        </div>
      </div>

      <div className="space-y-2 mt-3">
        {data.map(item => (
          <div key={item.status} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: STATUS_COLORS[item.status],
                }}
              />

              <span className="text-sm text-gray-600 dark:text-gray-400">
                {item.status}
              </span>
            </div>

            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersByStatusChart;
