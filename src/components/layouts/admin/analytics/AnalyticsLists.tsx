'use client';

import React from 'react';
import { MapPin, Truck } from 'lucide-react';

import type { AnalyticsData } from '@/types/analytics.type';

type AnalyticsListsProps = {
  analytics: AnalyticsData;
};

const AnalyticsLists = ({ analytics }: AnalyticsListsProps) => {
  const formatCurrency = (value: number) => {
    return `৳${value.toLocaleString('en-BD')}`;
  };

  return (
    <div className="space-y-6">
      {/* Customers */}
      <div className="rounded-md border border-border bg-background p-5">
        <div className="mb-6">
          <h2 className="text-lg font-semibold ">Top Customers</h2>

          <p className="text-sm text-muted-foreground">
            Customers ranked by revenue
          </p>
        </div>

        {analytics.topCustomers.length === 0 ? (
          <div className="flex h-[200px] items-center justify-center">
            <p className="text-sm text-muted-foreground">
              No customers available
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {analytics.topCustomers.map((customer, index) => (
              <div
                key={customer.userId}
                className="flex items-center gap-4 rounded-md border border-border p-3 transition hover:bg-muted/40"
              >
                {/* Rank */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {index + 1}
                </div>

                {/* Customer */}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium ">{customer.name}</p>

                  <p className="text-xs text-muted-foreground">
                    {customer.phone}
                  </p>
                </div>

                {/* Orders */}
                <div className="hidden text-right sm:block">
                  <p className="text-xs text-muted-foreground">Orders</p>

                  <p className="font-semibold ">{customer.orders}</p>
                </div>

                {/* Revenue */}
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Revenue</p>

                  <p className="font-semibold ">
                    {formatCurrency(customer.revenue)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Shipping */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ShippingCard
          title="Inside Dhaka"
          subtitle="Shipping area performance"
          orders={analytics.summary.insideDhakaOrders}
          revenue={analytics.summary.insideDhakaRevenue}
          icon={<MapPin className="h-5 w-5" />}
          formatCurrency={formatCurrency}
        />

        <ShippingCard
          title="Outside Dhaka"
          subtitle="Shipping area performance"
          orders={analytics.summary.outsideDhakaOrders}
          revenue={analytics.summary.outsideDhakaRevenue}
          icon={<Truck className="h-5 w-5" />}
          formatCurrency={formatCurrency}
        />
      </div>
    </div>
  );
};

type ShippingCardProps = {
  title: string;
  subtitle: string;
  orders: number;
  revenue: number;
  icon: React.ReactNode;
  formatCurrency: (value: number) => string;
};

const ShippingCard = ({
  title,
  subtitle,
  orders,
  revenue,
  icon,
  formatCurrency,
}: ShippingCardProps) => {
  return (
    <div className="rounded-md border border-border bg-background p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
          {icon}
        </div>

        <div>
          <h3 className="font-semibold ">{title}</h3>

          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <div className="rounded-md bg-muted/40 p-4">
          <p className="text-sm text-muted-foreground">Orders</p>

          <p className="mt-1 text-xl font-bold ">{orders}</p>
        </div>

        <div className="rounded-md bg-muted/40 p-4">
          <p className="text-sm text-muted-foreground">Revenue</p>

          <p className="mt-1 text-xl font-bold text-primary">
            {formatCurrency(revenue)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsLists;
