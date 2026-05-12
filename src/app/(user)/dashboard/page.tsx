'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingBag,
  Heart,
  DollarSign,
  CreditCard,
  Package,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

// Types
type OrderStatus =
  | 'Delivered'
  | 'Processing'
  | 'Shipped'
  | 'Completed'
  | 'Pending';

type Stat = {
  totalOrders: number;
  pendingOrders: number;
  totalWishlist: number;
  totalSpent: number;
};

type RecentOrder = {
  id: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: number;
};

type WishlistItem = {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  image: string;
};

type Payment = {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: OrderStatus;
};

// Sample data
const stats: Stat = {
  totalOrders: 24,
  pendingOrders: 3,
  totalWishlist: 12,
  totalSpent: 1247.89,
};

const recentOrders: RecentOrder[] = [
  {
    id: '#ORD-001',
    date: '2024-01-15',
    total: 89.99,
    status: 'Delivered',
    items: 2,
  },
  {
    id: '#ORD-002',
    date: '2024-01-10',
    total: 145.5,
    status: 'Processing',
    items: 3,
  },
  {
    id: '#ORD-003',
    date: '2024-01-05',
    total: 34.99,
    status: 'Shipped',
    items: 1,
  },
  {
    id: '#ORD-004',
    date: '2024-01-01',
    total: 299.99,
    status: 'Delivered',
    items: 4,
  },
];

const wishlistItems: WishlistItem[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 79.99,
    inStock: true,
    image: '/placeholder-image.jpg',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    inStock: true,
    image: '/placeholder-image.jpg',
  },
  {
    id: 3,
    name: 'Laptop Backpack',
    price: 49.99,
    inStock: false,
    image: '/placeholder-image.jpg',
  },
];

const paymentHistory: Payment[] = [
  {
    id: 'PAY-001',
    date: '2024-01-15',
    amount: 89.99,
    method: 'Credit Card',
    status: 'Completed',
  },
  {
    id: 'PAY-002',
    date: '2024-01-10',
    amount: 145.5,
    method: 'PayPal',
    status: 'Completed',
  },
  {
    id: 'PAY-003',
    date: '2024-01-05',
    amount: 34.99,
    method: 'Credit Card',
    status: 'Completed',
  },
  {
    id: 'PAY-004',
    date: '2024-01-01',
    amount: 299.99,
    method: 'Bank Transfer',
    status: 'Pending',
  },
];

const getStatusColor = (status: OrderStatus): string => {
  const colors: Record<OrderStatus, string> = {
    Delivered:
      'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    Processing:
      'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
    Shipped: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    Completed:
      'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    Pending:
      'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  };
  return (
    colors[status] ||
    'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
  );
};

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className=" px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2">
            Welcome back! Here&apos;s what&apos;s happening with your account.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 lg:mb-12">
          {/* Total Orders */}
          <div className="bg-white dark:bg-gray-800 rounded-sm shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Orders
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {stats.totalOrders}
                </p>
                {stats.pendingOrders > 0 && (
                  <p className="text-xs text-orange-500 dark:text-orange-400 mt-2">
                    {stats.pendingOrders} pending
                  </p>
                )}
              </div>
              <div className="bg-orange-100 dark:bg-orange-900/30 rounded-full p-3">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 dark:text-orange-400" />
              </div>
            </div>
          </div>

          {/* Wishlist */}
          <div className="bg-white dark:bg-gray-800 rounded-sm shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Wishlist
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {stats.totalWishlist}
                </p>
              </div>
              <div className="bg-pink-100 dark:bg-pink-900/30 rounded-full p-3">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500 dark:text-pink-400" />
              </div>
            </div>
          </div>

          {/* Total Spent */}
          <div className="bg-white dark:bg-gray-800 rounded-sm shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Spent
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  ${stats.totalSpent}
                </p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-3">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 dark:text-green-400" />
              </div>
            </div>
          </div>

          {/* Payments */}
          <div className="bg-white dark:bg-gray-800 rounded-sm shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Payments
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {paymentHistory.length}
                </p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-3">
                <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 dark:text-blue-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders & Wishlist */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12">
          {/* Recent Orders */}
          <div className="bg-white dark:bg-gray-800 rounded-sm shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                Recent Orders
              </h2>
              <button className="inline-flex items-center gap-1 text-orange-500 hover:text-orange-600 text-sm font-medium transition-colors">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {recentOrders.map(order => (
                <div
                  key={order.id}
                  className="px-4 sm:px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  {/* Mobile View */}
                  <div className="block lg:hidden">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {order.id}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {order.date}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {order.items} items
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ${order.total}
                      </span>
                    </div>
                  </div>

                  {/* Desktop View */}
                  <div className="hidden lg:flex lg:items-center lg:justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {order.id}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {order.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {order.items} items
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ${order.total}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Wishlist */}
          <div className="bg-white dark:bg-gray-800 rounded-sm shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                Wishlist
              </h2>
              <button className="inline-flex items-center gap-1 text-orange-500 hover:text-orange-600 text-sm font-medium transition-colors">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {wishlistItems.map(item => (
                <div
                  key={item.id}
                  className="px-4 sm:px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="relative w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </h3>
                        <p className="text-orange-500 dark:text-orange-400 font-semibold">
                          ${item.price}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                      {!item.inStock && (
                        <span className="inline-flex items-center gap-1 text-xs text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded-full">
                          <AlertCircle className="w-3 h-3" />
                          Out of Stock
                        </span>
                      )}
                      <button
                        disabled={!item.inStock}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          item.inStock
                            ? 'bg-orange-500 hover:bg-orange-600 text-white'
                            : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white dark:bg-gray-800 rounded-sm shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              Payment History
            </h2>
            <button className="inline-flex items-center gap-1 text-orange-500 hover:text-orange-600 text-sm font-medium transition-colors">
              Download Statement <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Transaction ID
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Date
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Amount
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Method
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {paymentHistory.map(payment => (
                  <tr
                    key={payment.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      {payment.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {payment.date}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                      ${payment.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {payment.method}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}
                      >
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="sm:hidden divide-y divide-gray-100 dark:divide-gray-700">
            {paymentHistory.map(payment => (
              <div key={payment.id} className="px-4 py-4">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {payment.id}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getStatusColor(payment.status)}`}
                  >
                    {payment.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      Date:
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {payment.date}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      Amount:
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${payment.amount}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      Method:
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {payment.method}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
