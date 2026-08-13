'use client';

import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  DollarSign,
  Package,
  ShoppingBag,
  Users,
} from 'lucide-react';

import { DashboardSummary } from '@/types/dashboard.type';

interface DashboardStatsProps {
  summary: DashboardSummary;
}

const DashboardStats = ({ summary }: DashboardStatsProps) => {
  const stats = [
    {
      title: 'Total Revenue',
      value: `৳${summary.totalSales.toLocaleString()}`,
      icon: DollarSign,
    },
    {
      title: 'Total Orders',
      value: summary.totalOrders.toLocaleString(),
      icon: ShoppingBag,
    },
    {
      title: 'Total Products',
      value: summary.totalProducts.toLocaleString(),
      icon: Package,
    },
    {
      title: 'Total Customers',
      value: summary.totalCustomers.toLocaleString(),
      icon: Users,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 ">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -2 }}
            className="bg-white dark:bg-gray-900 p-6 shadow-sm border border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="p-2.5 bg-primary/10 text-primary">
                <Icon size={20} />
              </div>

              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 dark:bg-green-500/10">
                <ArrowUpRight size={14} className="text-green-500" />

                <span className="text-xs font-medium text-green-500">Live</span>
              </div>
            </div>

            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              {stat.title}
            </p>

            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
