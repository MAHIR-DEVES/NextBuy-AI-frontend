'use client';

import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

import { RecentOrder } from '@/types/dashboard.type';

interface RecentOrdersProps {
  orders: RecentOrder[];
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'DELIVERED':
      return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';

    case 'SHIPPED':
      return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400';

    case 'PENDING':
      return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';

    case 'CANCELLED':
      return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';

    case 'PARTIAL':
      return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';

    default:
      return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400';
  }
};

const formatStatus = (status: string) => {
  return status.charAt(0) + status.slice(1).toLowerCase();
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

const RecentOrders = ({ orders }: RecentOrdersProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <ShoppingCart size={20} className="text-primary" />
              Recent Orders
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Latest transactions
            </p>
          </div>

          <Link
            href="/admin/orders"
            className="text-sm text-primary hover:opacity-80 font-medium"
          >
            View All
          </Link>
        </div>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {orders.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-500">
            No recent orders found
          </div>
        ) : (
          orders.map(order => (
            <div
              key={order.id}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900 dark:text-white text-sm truncate max-w-[180px]">
                      {order.name}
                    </span>

                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(
                        order.status,
                      )}`}
                    >
                      {formatStatus(order.status)}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{order.phone}</span>

                    <span>•</span>

                    <span>
                      {order.itemsCount}{' '}
                      {order.itemsCount === 1 ? 'item' : 'items'}
                    </span>

                    <span>•</span>

                    <span>{formatDate(order.createdAt)}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-base font-bold text-gray-900 dark:text-white">
                    ৳{order.total.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default RecentOrders;
