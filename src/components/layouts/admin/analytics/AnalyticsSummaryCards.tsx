import React from 'react';
import {
  BarChart3,
  CheckCircle2,
  Clock3,
  DollarSign,
  Package,
  ShoppingBag,
  Truck,
  XCircle,
} from 'lucide-react';

import type { AnalyticsSummary } from '@/types/analytics.type';

type AnalyticsSummaryCardsProps = {
  summary: AnalyticsSummary;
};

const AnalyticsSummaryCards = ({ summary }: AnalyticsSummaryCardsProps) => {
  const cards = [
    {
      title: 'Total Orders',
      value: summary.totalOrders,
      icon: ShoppingBag,
    },
    {
      title: 'Total Sales',
      value: `৳${summary.totalSales.toLocaleString('en-BD')}`,
      icon: DollarSign,
    },
    {
      title: 'Delivered Orders',
      value: summary.deliveredOrders,
      icon: CheckCircle2,
    },
    {
      title: 'Pending Orders',
      value: summary.pendingOrders,
      icon: Clock3,
    },
    {
      title: 'Shipped Orders',
      value: summary.shippedOrders,
      icon: Truck,
    },
    {
      title: 'Cancelled Orders',
      value: summary.cancelledOrders,
      icon: XCircle,
    },
    {
      title: 'Products Sold',
      value: summary.totalProductsSold,
      icon: Package,
    },
    {
      title: 'Average Order',
      value: `৳${summary.averageOrderValue.toLocaleString('en-BD')}`,
      icon: BarChart3,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(card => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-lg border border-border bg-background p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{card.title}</p>

                <h3 className="mt-2 text-2xl font-bold ">{card.value}</h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 " />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AnalyticsSummaryCards;
