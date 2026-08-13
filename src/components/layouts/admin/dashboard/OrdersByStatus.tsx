'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  PieChart as PieIcon,
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { BarChart3, PieChart } from 'lucide-react';

import { DashboardOrderStatus, OrderStatusCount } from '@/types/dashboard.type';

interface OrdersByStatusProps {
  data: OrderStatusCount[];
}

const STATUS_COLORS: Record<DashboardOrderStatus, string> = {
  PENDING: '#f59e0b',
  SHIPPED: '#3b82f6',
  DELIVERED: '#10b981',
  CANCELLED: '#ef4444',
  PARTIAL: '#8b5cf6',
};

const formatStatus = (status: DashboardOrderStatus) => {
  return status.charAt(0) + status.slice(1).toLowerCase();
};

const OrdersByStatus = ({ data }: OrdersByStatusProps) => {
  const statusData = useMemo(() => {
    return data.map(item => ({
      ...item,
      name: item.status,
    }));
  }, [data]);

  const totalOrders = useMemo(() => {
    return data.reduce((total, item) => total + item.count, 0);
  }, [data]);

  return (
    <ChartCard
      icon={PieIcon}
      title="Orders by Status"
      description="Current order status distribution"
    >
      {statusData.length === 0 || totalOrders === 0 ? (
        <EmptyChart />
      ) : (
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RePieChart>
              <Pie
                data={statusData}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="45%"
                innerRadius={68}
                outerRadius={96}
                paddingAngle={4}
                stroke="var(--card)"
                strokeWidth={3}
              >
                {statusData.map(item => (
                  <Cell key={item.status} fill={STATUS_COLORS[item.status]} />
                ))}
              </Pie>

              <Tooltip content={<StatusTooltip />} />

              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                formatter={value => (
                  <span className="text-xs font-medium text-foreground capitalize">
                    {formatStatus(value as DashboardOrderStatus)}
                  </span>
                )}
              />
            </RePieChart>
          </ResponsiveContainer>
        </div>
      )}
    </ChartCard>
  );
};

// ------------------------------------
// CHART CARD
// ------------------------------------

const ChartCard = ({
  icon: Icon,
  title,
  description,
  children,
  className = '',
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
      }}
      whileHover={{
        y: -2,
      }}
      className={` border border-border/70 bg-card p-5 text-card-foreground  ${className}`}
    >
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <PieChart size={20} className="text-primary" />
        </div>

        <div>
          <h2 className="text-base font-bold tracking-tight text-foreground">
            {title}
          </h2>

          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>

      {children}
    </motion.div>
  );
};

// ------------------------------------
// TOOLTIP
// ------------------------------------

const StatusTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: any[];
}) => {
  if (!active || !payload?.length) return null;

  const item = payload[0];

  return (
    <div className=" border border-border bg-popover/95 p-3 shadow-md backdrop-blur-md">
      <p className="text-xs font-semibold text-foreground capitalize">
        {formatStatus(item.payload?.status)}
      </p>

      <p className="mt-1 text-xs text-muted-foreground">
        Total Orders:{' '}
        <span className="font-bold text-foreground">{item.value}</span>
      </p>
    </div>
  );
};

// ------------------------------------
// EMPTY STATE
// ------------------------------------

const EmptyChart = () => {
  return (
    <div className="flex h-[280px] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center  bg-muted">
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
        </div>

        <p className="text-sm font-semibold text-foreground">
          No data available
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          There is not enough order data to display right now.
        </p>
      </div>
    </div>
  );
};

export default OrdersByStatus;
