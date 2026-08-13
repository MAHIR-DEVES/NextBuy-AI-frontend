'use client';

import React, { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  TrendingUp,
  PieChart as PieIcon,
  MapPin,
  BarChart3,
  Trophy,
} from 'lucide-react';

import type { AnalyticsData } from '@/types/analytics.type';
import type { OrderStatus } from '@/types/orders';

type AnalyticsChartsProps = {
  analytics: AnalyticsData;
};

//  CONSTANTS

const STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING: '#f59e0b',
  SHIPPED: '#3b82f6',
  DELIVERED: '#10b981',
  CANCELLED: '#ef4444',
  PARTIAL: '#8b5cf6',
};

//  HELPERS

const formatCurrency = (value: number) => {
  return `৳${value.toLocaleString('en-BD')}`;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

//  MAIN COMPONENT

const AnalyticsCharts = ({ analytics }: AnalyticsChartsProps) => {
  //  REVENUE DATA

  const revenueData = useMemo(() => {
    return analytics.revenueTrend.map(item => ({
      ...item,
      dateLabel: formatDate(item.date),
    }));
  }, [analytics.revenueTrend]);

  //  STATUS DATA

  const statusData = useMemo(() => {
    return analytics.ordersByStatus.map(item => ({
      ...item,
      name: item.status,
    }));
  }, [analytics.ordersByStatus]);

  //  PRODUCT DATA

  const productData = useMemo(() => {
    return [...analytics.bestSellingProducts]
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [analytics.bestSellingProducts]);

  //  DISTRICT DATA

  const districtData = useMemo(() => {
    return [...analytics.topDistricts]
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 7);
  }, [analytics.topDistricts]);

  return (
    <div className="space-y-6">
      {/* REVENUE + STATUS ROW */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* REVENUE TREND */}
        <ChartCard
          icon={TrendingUp}
          title="Revenue Trend"
          description="Revenue generated from delivered orders"
          className="xl:col-span-2"
        >
          {revenueData.length === 0 ? (
            <EmptyChart />
          ) : (
            <div className="h-[320px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueData}
                  margin={{ top: 12, right: 12, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="revenueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="var(--primary)"
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--primary)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    className="stroke-border/60"
                  />

                  <XAxis
                    dataKey="dateLabel"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11, fill: 'currentColor' }}
                    className="text-muted-foreground"
                    dy={8}
                  />

                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11, fill: 'currentColor' }}
                    tickFormatter={value => `৳${value}`}
                    width={60}
                    className="text-muted-foreground"
                  />

                  <Tooltip content={<RevenueTooltip />} />

                  <Line
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="var(--primary)"
                    strokeWidth={2.5}
                    dot={{
                      r: 4,
                      fill: 'var(--primary)',
                      strokeWidth: 2,
                      stroke: 'var(--card)',
                    }}
                    activeDot={{
                      r: 6,
                      fill: 'var(--primary)',
                      stroke: 'var(--card)',
                      strokeWidth: 3,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </ChartCard>

        {/* ORDER STATUS */}
        <ChartCard
          icon={PieIcon}
          title="Orders by Status"
          description="Current order status distribution"
        >
          {statusData.length === 0 ? (
            <EmptyChart />
          ) : (
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
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
                      <Cell
                        key={item.status}
                        fill={STATUS_COLORS[item.status]}
                      />
                    ))}
                  </Pie>

                  <Tooltip content={<StatusTooltip />} />

                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    formatter={value => (
                      <span className="text-xs font-medium text-foreground capitalize">
                        {value.toLowerCase()}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </ChartCard>
      </div>

      {/* BEST SELLING PRODUCTS + TOP DISTRICTS ROW */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* BEST SELLING PRODUCTS */}
        <ChartCard
          icon={Trophy}
          title="Best-Selling Products"
          description="Top products ranked by revenue performance"
        >
          {productData.length === 0 ? (
            <EmptyChart />
          ) : (
            <div className="space-y-3 py-1">
              {productData.map((product, index) => {
                const maxRevenue = productData[0]?.revenue || 1;
                const percentage = Math.round(
                  (product.revenue / maxRevenue) * 100,
                );

                return (
                  <div
                    key={product.productId || index}
                    className="group relative flex flex-col gap-2.5 rounded-md border border-border/50 bg-muted/20 p-3.5 transition-all duration-200 hover:border-primary/40 hover:bg-muted/40"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-extrabold ${
                            index === 0
                              ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                              : index === 1
                                ? 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border border-slate-500/30'
                                : index === 2
                                  ? 'bg-amber-700/15 text-amber-700 dark:text-amber-500 border border-amber-700/30'
                                  : 'bg-muted text-muted-foreground border border-border/50'
                          }`}
                        >
                          {index + 1}
                        </span>

                        <div className="min-w-0 flex-1">
                          <h4
                            className="text-sm font-semibold text-foreground truncate"
                            title={product.productName}
                          >
                            {product.productName}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs font-medium text-muted-foreground bg-background px-2.5 py-1 rounded-md border border-border/60">
                          {product.quantity} sold
                        </span>
                        <span className="text-sm font-bold text-primary">
                          {formatCurrency(product.revenue)}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ChartCard>

        {/* TOP DISTRICTS */}
        <ChartCard
          icon={MapPin}
          title="Top Districts"
          description="District-wise revenue performance distribution"
        >
          {districtData.length === 0 ? (
            <EmptyChart />
          ) : (
            <div className="h-[340px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={districtData}
                  margin={{ top: 12, right: 12, left: 0, bottom: 0 }}
                  barCategoryGap="20%"
                >
                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    className="stroke-border/60"
                  />

                  <XAxis
                    dataKey="district"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11, fill: 'currentColor' }}
                    className="text-muted-foreground"
                    dy={8}
                  />

                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11, fill: 'currentColor' }}
                    tickFormatter={value => `৳${value}`}
                    width={60}
                    className="text-muted-foreground"
                  />

                  <Tooltip content={<DistrictTooltip />} />

                  <Bar
                    dataKey="revenue"
                    name="Revenue"
                    fill="var(--primary)"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </ChartCard>
      </div>
    </div>
  );
};

//  CHART CARD WRAPPER

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
    <div
      className={`rounded-md border border-border/70 bg-card p-5 text-card-foreground shadow-xs transition-shadow hover:shadow-sm ${className}`}
    >
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-base font-bold tracking-tight text-foreground">
            {title}
          </h2>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>

      {children}
    </div>
  );
};

//  CUSTOM TOOLTIPS

const RevenueTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;

  const revenue = payload[0]?.value ?? 0;
  const orders = payload[0]?.payload?.orders ?? 0;

  return (
    <div className="rounded-md border border-border bg-popover/95 p-3 shadow-md backdrop-blur-md">
      <p className="mb-1.5 text-xs font-semibold text-muted-foreground">
        {label}
      </p>
      <div className="space-y-0.5">
        <p className="text-xs text-muted-foreground">
          Revenue:{' '}
          <span className="font-bold text-primary">
            {formatCurrency(Number(revenue))}
          </span>
        </p>
        <p className="text-xs text-muted-foreground">
          Orders: <span className="font-medium text-foreground">{orders}</span>
        </p>
      </div>
    </div>
  );
};

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
    <div className="rounded-md border border-border bg-popover/95 p-3 shadow-md backdrop-blur-md">
      <p className="text-xs font-semibold text-foreground capitalize">
        {item.name?.toLowerCase()}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Total Orders:{' '}
        <span className="font-bold text-foreground">{item.value}</span>
      </p>
    </div>
  );
};

const DistrictTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: any[];
}) => {
  if (!active || !payload?.length) return null;

  const district = payload[0]?.payload;

  return (
    <div className="rounded-md border border-border bg-popover/95 p-3 shadow-md backdrop-blur-md">
      <p className="mb-1 text-xs font-bold text-foreground">
        {district.district}
      </p>
      <div className="space-y-0.5">
        <p className="text-xs text-muted-foreground">
          Revenue:{' '}
          <span className="font-bold text-primary">
            {formatCurrency(district.revenue)}
          </span>
        </p>
        <p className="text-xs text-muted-foreground">
          Orders:{' '}
          <span className="font-medium text-foreground">{district.orders}</span>
        </p>
      </div>
    </div>
  );
};

//  EMPTY CHART STATE

const EmptyChart = () => {
  return (
    <div className="flex h-[280px] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-muted">
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="text-sm font-semibold text-foreground">
          No data available
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          There is not enough analytical data to display right now.
        </p>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
