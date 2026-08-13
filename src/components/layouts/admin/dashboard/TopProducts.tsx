'use client';

import { motion } from 'framer-motion';
import { Award, Eye } from 'lucide-react';
import Image from 'next/image';

import { TopProduct } from '@/types/dashboard.type';

interface TopProductsProps {
  products: TopProduct[];
}

const TopProducts = ({ products }: TopProductsProps) => {
  const maxRevenue = Math.max(...products.map(product => product.revenue), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Award size={20} className="text-primary" />
              Top Products
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Best-selling products by revenue
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Eye size={14} />
            Revenue
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {products.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-500">
            No product sales available
          </div>
        ) : (
          products.map((product, index) => {
            const progress = (product.revenue / maxRevenue) * 100;

            return (
              <div
                key={product.productId}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
                    <Image
                      src={product.thumbnail}
                      alt={product.productName}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                          {product.productName}
                        </p>

                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {product.quantity.toLocaleString()} units sold
                        </p>
                      </div>

                      <p className="text-sm font-bold text-gray-900 dark:text-white whitespace-nowrap">
                        ৳{product.revenue.toLocaleString()}
                      </p>
                    </div>

                    <div className="mt-3 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${progress}%`,
                        }}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.08,
                        }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </motion.div>
  );
};

export default TopProducts;
