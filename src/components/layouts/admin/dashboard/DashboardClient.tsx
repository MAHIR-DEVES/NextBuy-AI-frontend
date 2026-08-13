'use client';

import DashboardHeader from './DashboardHeader';
import DashboardStats from './DashboardStats';
import OrdersByStatus from './OrdersByStatus';
import RecentOrders from './RecentOrders';
import RevenueTrendChart from './RevenueTrendChart';
import TopProducts from './TopProducts';

import { DashboardStats as DashboardStatsType } from '@/types/dashboard.type';

interface DashboardClientProps {
  data: DashboardStatsType;
}

const DashboardClient = ({ data }: DashboardClientProps) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="">
        <DashboardHeader summary={data.summary} />

        <DashboardStats summary={data.summary} />

        <div className="grid grid-cols-1 xl:grid-cols-3 ">
          <div className="xl:col-span-2">
            <RevenueTrendChart data={data.revenueTrend} />
          </div>

          <OrdersByStatus data={data.ordersByStatus} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 ">
          <TopProducts products={data.topProducts} />

          <RecentOrders orders={data.recentOrders} />
        </div>
      </div>
    </div>
  );
};

export default DashboardClient;
