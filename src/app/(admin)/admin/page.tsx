/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { motion } from 'framer-motion';
import {
  Users,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Package,
  DollarSign,
  Eye,
  ShoppingCart,
  Star,
  Zap,
  Award,
  BarChart3,
  PieChart,
  Menu,
  X,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
} from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('month');
  const [statsData, setStatsData] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/stats`,
        );
        setStatsData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStats();
  }, []);

  // Stats cards data
  const stats = [
    {
      title: 'Total Revenue',
      value: '$48,293',
      change: '+23.5%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Total Orders',
      value: '1,284',
      change: '+18.2%',
      trend: 'up',
      icon: ShoppingBag,
    },
    {
      title: 'Active Products',
      value: statsData?.products || 342,
      change: '+12.3%',
      trend: 'up',
      icon: Package,
    },
    {
      title: 'Total Customers',
      value: statsData?.users || 2847,
      change: '+8.7%',
      trend: 'up',
      icon: Users,
    },
  ];

  // Monthly revenue data for bar chart
  const monthlyRevenue = [
    { month: 'Jan', revenue: 42000, orders: 320 },
    { month: 'Feb', revenue: 45000, orders: 345 },
    { month: 'Mar', revenue: 48000, orders: 380 },
    { month: 'Apr', revenue: 52000, orders: 420 },
    { month: 'May', revenue: 63500, orders: 480 },
    { month: 'Jun', revenue: 58000, orders: 450 },
  ];

  // Top products data
  const topProducts = [
    {
      name: 'Wireless Headphones',
      sales: 1247,
      revenue: 49880,
      growth: 15,
      rating: 4.8,
    },
    {
      name: 'Smart Watch Pro',
      sales: 982,
      revenue: 88200,
      growth: 22,
      rating: 4.9,
    },
    {
      name: 'Premium Laptop',
      sales: 456,
      revenue: 273600,
      growth: 8,
      rating: 4.7,
    },
    {
      name: 'Noise Earbuds',
      sales: 2134,
      revenue: 63900,
      growth: 31,
      rating: 4.6,
    },
    {
      name: 'Gaming Mouse',
      sales: 1876,
      revenue: 37520,
      growth: 18,
      rating: 4.5,
    },
  ];

  // Category distribution
  const categoryData = [
    { name: 'Electronics', value: 45, color: '#f97316', count: 154 },
    { name: 'Fashion', value: 25, color: '#fb923c', count: 86 },
    { name: 'Home & Garden', value: 15, color: '#fdba74', count: 52 },
    { name: 'Sports', value: 10, color: '#fed7aa', count: 34 },
    { name: 'Others', value: 5, color: '#fff7ed', count: 16 },
  ];

  // Recent orders
  const recentOrders = [
    {
      id: '#ORD-3842',
      customer: 'John Doe',
      amount: 299.99,
      status: 'Delivered',
      date: '2 hours ago',
      items: 2,
    },
    {
      id: '#ORD-3841',
      customer: 'Jane Smith',
      amount: 149.99,
      status: 'Processing',
      date: '5 hours ago',
      items: 1,
    },
    {
      id: '#ORD-3840',
      customer: 'Mike Johnson',
      amount: 599.99,
      status: 'Shipped',
      date: 'Yesterday',
      items: 3,
    },
    {
      id: '#ORD-3839',
      customer: 'Sarah Wilson',
      amount: 89.99,
      status: 'Pending',
      date: 'Yesterday',
      items: 1,
    },
    {
      id: '#ORD-3838',
      customer: 'David Brown',
      amount: 199.99,
      status: 'Delivered',
      date: '2 days ago',
      items: 2,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'Processing':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'Shipped':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400';
      case 'Pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-800"
      >
        {sidebarOpen ? (
          <X className="text-gray-600 dark:text-gray-400" size={20} />
        ) : (
          <Menu className="text-gray-600 dark:text-gray-400" size={20} />
        )}
      </button>

      {/* Main Content */}
      <div className="">
        <div className="space-y-6">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-xs bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 md:p-8 shadow-sm"
          >
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
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

              <div className="flex gap-3">
                <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xs text-gray-700 dark:text-gray-300 font-medium transition-all duration-300 flex items-center gap-2">
                  <Download size={18} />
                  Export Report
                </button>
                <Link href="/admin/products">
                  <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xs font-medium transition-all duration-300 flex items-center gap-2 shadow-sm">
                    <Package size={18} />
                    Add Product
                  </button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  Today&apos;s Sales
                </p>
                <p className="text-gray-900 dark:text-white text-xl font-bold">
                  $2,847
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  Pending Orders
                </p>
                <p className="text-gray-900 dark:text-white text-xl font-bold">
                  23
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  Conversion Rate
                </p>
                <p className="text-gray-900 dark:text-white text-xl font-bold">
                  3.24%
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  Page Views
                </p>
                <p className="text-gray-900 dark:text-white text-xl font-bold">
                  12.4K
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const TrendIcon =
                stat.trend === 'up' ? ArrowUpRight : ArrowDownRight;
              const trendColor =
                stat.trend === 'up' ? 'text-green-500' : 'text-red-500';

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="bg-white dark:bg-gray-900 rounded-xs p-6 shadow-sm border border-gray-200 dark:border-gray-800 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-orange-100 dark:bg-orange-500/10 rounded-lg">
                      <Icon
                        className="text-orange-500 dark:text-orange-400"
                        size={20}
                      />
                    </div>
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-50 dark:bg-green-500/10' : 'bg-red-50 dark:bg-red-500/10'}`}
                    >
                      <TrendIcon size={14} className={trendColor} />
                      <span className={`text-xs font-medium ${trendColor}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {stat.title}
                  </h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xs p-6 shadow-sm border border-gray-200 dark:border-gray-800"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <BarChart3 size={20} className="text-orange-500" />
                    Revenue Overview
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Monthly revenue performance
                  </p>
                </div>
                <select
                  value={timeRange}
                  onChange={e => setTimeRange(e.target.value)}
                  className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 mt-3 sm:mt-0"
                >
                  <option value="week">Last 7 days</option>
                  <option value="month">Last 30 days</option>
                  <option value="quarter">Last quarter</option>
                  <option value="year">This year</option>
                </select>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyRevenue}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #f97316',
                        borderRadius: '8px',
                        padding: '8px 12px',
                      }}
                      cursor={{ fill: '#f97316', opacity: 0.1 }}
                    />
                    <Bar
                      dataKey="revenue"
                      fill="#f97316"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={50}
                      name="Revenue ($)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Category Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-xs p-6 shadow-sm border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <PieChart size={20} className="text-orange-500" />
                    Category Sales
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Product distribution
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    342
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Total Products
                  </p>
                </div>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 space-y-2">
                {categoryData.map((cat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {cat.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {cat.value}%
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {cat.count} products
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Top Products & Recent Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-900 rounded-xs shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <Award size={20} className="text-orange-500" />
                      Top Products
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Best selling items
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Eye size={14} />
                    <span>Last 30 days</span>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {topProducts.map((product, idx) => (
                  <div
                    key={idx}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold text-sm">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
                            {product.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <div className="flex items-center gap-0.5">
                              <Star
                                size={10}
                                className="fill-yellow-400 text-yellow-400"
                              />
                              <span className="text-xs text-gray-600 dark:text-gray-400">
                                {product.rating}
                              </span>
                            </div>
                            <span className="text-xs text-gray-400 dark:text-gray-600">
                              •
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {product.sales.toLocaleString()} sales
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          ${product.revenue.toLocaleString()}
                        </p>
                        <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-0.5 justify-end">
                          <ArrowUpRight size={10} />+{product.growth}%
                        </p>
                      </div>
                    </div>
                    <div className="relative h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(product.sales / 2500) * 100}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className="absolute h-full bg-orange-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-900 rounded-xs shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <ShoppingCart size={20} className="text-orange-500" />
                      Recent Orders
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Latest transactions
                    </p>
                  </div>
                  <Link href="/admin/orders">
                    <button className="text-sm text-orange-500 hover:text-orange-600 font-medium">
                      View All
                    </button>
                  </Link>
                </div>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {recentOrders.map((order, idx) => (
                  <div
                    key={idx}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900 dark:text-white text-sm">
                            {order.id}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                          <span>{order.customer}</span>
                          <span>•</span>
                          <span>{order.items} items</span>
                          <span>•</span>
                          <span>{order.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-bold text-gray-900 dark:text-white">
                          ${order.amount}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <Link href="/admin/products/add">
              <button className="bg-white dark:bg-gray-900 rounded-xs p-4 shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all duration-300 w-full text-left">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-500/10 rounded-lg">
                    <Package className="text-orange-500" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Add Product
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      New listing
                    </p>
                  </div>
                </div>
              </button>
            </Link>

            <Link href="/admin/orders">
              <button className="bg-white dark:bg-gray-900 rounded-xs p-4 shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all duration-300 w-full text-left">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-500/10 rounded-lg">
                    <ShoppingCart className="text-blue-500" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Manage Orders
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Track & update
                    </p>
                  </div>
                </div>
              </button>
            </Link>

            <Link href="/admin/users">
              <button className="bg-white dark:bg-gray-900 rounded-xs p-4 shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all duration-300 w-full text-left">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-500/10 rounded-lg">
                    <Users className="text-purple-500" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Customers
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      View all users
                    </p>
                  </div>
                </div>
              </button>
            </Link>

            <Link href="/admin/reports">
              <button className="bg-orange-500 hover:bg-orange-600 rounded-xs p-4 shadow-sm transition-all duration-300 w-full text-left">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Zap className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">View Reports</p>
                    <p className="text-xs text-orange-100">Analytics data</p>
                  </div>
                </div>
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
