'use client';

import { motion } from 'framer-motion';
import { Download, Package } from 'lucide-react';
import Link from 'next/link';
import { DashboardSummary } from '@/types/dashboard.type';

interface DashboardHeaderProps {
  summary: DashboardSummary;
}

const DashboardHeader = ({ summary }: DashboardHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 md:p-8 shadow-sm"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
              E-COMMERCE DASHBOARD
            </span>

            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs text-gray-600 dark:text-gray-400">
              {new Date().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, Admin! 👋
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
            Here&apos;s what&apos;s happening with your store today.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium transition-all flex items-center gap-2"
          >
            <Download size={18} />
            Export Report
          </button>

          <Link
            href="/admin/create-product"
            className="px-4 py-2 bg-primary hover:opacity-90 text-white font-medium transition-all flex items-center gap-2 shadow-sm"
          >
            <Package size={18} />
            Add Product
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4  mt-6 pt-5 border-t border-gray-100 dark:border-gray-800">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            Total Sales
          </p>

          <p className="text-gray-900 dark:text-white text-xl font-bold mt-1">
            ৳{summary.totalSales.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            Pending Orders
          </p>

          <p className="text-gray-900 dark:text-white text-xl font-bold mt-1">
            {summary.last7DaysOrders}
          </p>
        </div>

        <div>
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            Last 30 Days
          </p>

          <p className="text-gray-900 dark:text-white text-xl font-bold mt-1">
            {summary.last30DaysOrders}
          </p>
        </div>

        <div>
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            Average Order
          </p>

          <p className="text-gray-900 dark:text-white text-xl font-bold mt-1">
            ৳{summary.averageOrderValue.toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;
