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
  LineChart,
  Line,
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
        return 'bg-green-100 text-green-700';
      case 'Processing':
        return 'bg-blue-100 text-blue-700';
      case 'Shipped':
        return 'bg-purple-100 text-purple-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        {sidebarOpen ? (
          <X className="text-orange-500" />
        ) : (
          <Menu className="text-orange-500" />
        )}
      </button>

      {/* Main Content */}
      <div className="">
        <div className=" space-y-6">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-xs bg-white border border-gray-200 p-6 md:p-8 shadow-sm"
          >
            {/* Subtle background accent instead of heavy gradients */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gray-900 rounded-full blur-3xl" />
            </div>

            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                    E-COMMERCE DASHBOARD
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                    {new Date().toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Welcome back, Admin Dashboard ! 👋
                </h1>
                <p className="text-gray-500 text-sm md:text-base">
                  Here&apos;s what&apos;s happening with your store today.
                </p>
              </div>

              <div className="flex gap-3">
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 font-medium transition-all duration-300 flex items-center gap-2">
                  <Download size={18} />
                  Export Report
                </button>
                <Link href="/admin/products/add">
                  <button className="px-4 py-2  bg-gradient-to-r from-orange-500 to-amber-500 text-white  rounded-xl font-medium transition-all duration-300 flex items-center gap-2 shadow-sm">
                    <Package size={18} />
                    Add Product
                  </button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-gray-100">
              <div>
                <p className="text-gray-500 text-xs">Today&apos;s Sales</p>
                <p className="text-gray-900 text-xl font-bold">$2,847</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Pending Orders</p>
                <p className="text-gray-900 text-xl font-bold">23</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Conversion Rate</p>
                <p className="text-gray-900 text-xl font-bold">3.24%</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Page Views</p>
                <p className="text-gray-900 text-xl font-bold">12.4K</p>
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
                  whileHover={{ y: -5 }}
                  className="group relative bg-white rounded-xs p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-50 opacity-0 group-hover:opacity-100 rounded-xs transition-opacity duration-300" />

                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg">
                        <Icon className="text-white" size={22} />
                      </div>
                      <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-50' : 'bg-red-50'}`}
                      >
                        <TrendIcon size={14} className={trendColor} />
                        <span className={`text-xs font-medium ${trendColor}`}>
                          {stat.change}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      {stat.title}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>

                    <div className="mt-4 flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                          style={{ width: `${Math.random() * 40 + 60}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">
                        vs last month
                      </span>
                    </div>
                  </div>
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
              className="lg:col-span-2 bg-white rounded-xs p-6 shadow-lg border border-orange-100"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <BarChart3 size={20} className="text-orange-500" />
                    Revenue Overview
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Monthly revenue performance
                  </p>
                </div>
                <select
                  value={timeRange}
                  onChange={e => setTimeRange(e.target.value)}
                  className="px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 mt-3 sm:mt-0"
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
                        borderRadius: '12px',
                        padding: '8px 12px',
                      }}
                      cursor={{ fill: '#f97316', opacity: 0.1 }}
                    />
                    <Bar
                      dataKey="revenue"
                      fill="#f97316"
                      radius={[8, 8, 0, 0]}
                      maxBarSize={50}
                      name="Revenue ($)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">Average Revenue</p>
                  <p className="text-lg font-bold text-gray-900">$51,417</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Highest Month</p>
                  <p className="text-lg font-bold text-green-600">
                    $63,500 (May)
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Growth Rate</p>
                  <p className="text-lg font-bold text-orange-600">+23.5%</p>
                </div>
              </div>
            </motion.div>

            {/* Category Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xs p-6 shadow-lg border border-orange-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <PieChart size={20} className="text-orange-500" />
                    Category Sales
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Product distribution
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">342</p>
                  <p className="text-xs text-gray-500">Total Products</p>
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
                    className="flex items-center justify-between p-2 hover:bg-orange-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="text-sm text-gray-600">{cat.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold text-gray-900">
                        {cat.value}%
                      </span>
                      <span className="text-xs text-gray-400">
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
              className="bg-white rounded-xs shadow-lg border border-orange-100 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Award size={20} className="text-orange-500" />
                      Top Products
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Best selling items
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Eye size={14} />
                    <span>Last 30 days</span>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {topProducts.map((product, idx) => (
                  <div
                    key={idx}
                    className="p-4 hover:bg-orange-50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors">
                            {product.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <div className="flex items-center gap-0.5">
                              <Star
                                size={10}
                                className="fill-yellow-400 text-yellow-400"
                              />
                              <span className="text-xs text-gray-600">
                                {product.rating}
                              </span>
                            </div>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">
                              {product.sales.toLocaleString()} sales
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ${product.revenue.toLocaleString()}
                        </p>
                        <p className="text-xs text-green-600 flex items-center gap-0.5 justify-end">
                          <ArrowUpRight size={10} />+{product.growth}%
                        </p>
                      </div>
                    </div>
                    <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(product.sales / 2500) * 100}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className="absolute h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-orange-50">
                <Link href="/admin/products">
                  <button className="w-full px-4 py-2 bg-white text-orange-600 rounded-xl font-medium hover:bg-orange-100 transition-colors border border-orange-200">
                    View All Products →
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xs shadow-lg border border-orange-100 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <ShoppingCart size={20} className="text-orange-500" />
                      Recent Orders
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
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

              <div className="divide-y divide-gray-100">
                {recentOrders.map((order, idx) => (
                  <div
                    key={idx}
                    className="p-4 hover:bg-orange-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900 text-sm">
                            {order.id}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>{order.customer}</span>
                          <span>•</span>
                          <span>{order.items} items</span>
                          <span>•</span>
                          <span>{order.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-bold text-gray-900">
                          ${order.amount}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Today's Orders
                    </p>
                    <p className="text-2xl font-bold text-orange-600">18</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      Today's Revenue
                    </p>
                    <p className="text-2xl font-bold text-green-600">$2,847</p>
                  </div>
                  <div className="w-16 h-16">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[65, 72, 88, 95, 82, 78, 91].map((value, i) => ({
                          value,
                          index: i,
                        }))}
                      >
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#f97316"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
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
              <button className="group relative overflow-hidden bg-white rounded-xs p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="relative flex items-center gap-3">
                  <div className="p-2 bg-orange-50 rounded-xl group-hover:scale-110 transition-transform">
                    <Package className="text-orange-500" size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Add Product</p>
                    <p className="text-xs text-gray-500">New listing</p>
                  </div>
                </div>
              </button>
            </Link>

            <Link href="/admin/orders">
              <button className="group relative overflow-hidden bg-white rounded-xs p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="relative flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-xl group-hover:scale-110 transition-transform">
                    <ShoppingCart className="text-blue-500" size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Manage Orders</p>
                    <p className="text-xs text-gray-500">Track & update</p>
                  </div>
                </div>
              </button>
            </Link>

            <Link href="/admin/customers">
              <button className="group relative overflow-hidden bg-white rounded-xs p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="relative flex items-center gap-3">
                  <div className="p-2 bg-purple-50 rounded-xl group-hover:scale-110 transition-transform">
                    <Users className="text-purple-500" size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Customers</p>
                    <p className="text-xs text-gray-500">View all users</p>
                  </div>
                </div>
              </button>
            </Link>

            <Link href="/admin/reports">
              <button className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-amber-500 rounded-xs p-4 shadow-lg hover:shadow-xl transition-all duration-300 w-full">
                <div className="relative flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl group-hover:scale-110 transition-transform">
                    <Zap className="text-white" size={20} />
                  </div>
                  <div className="text-left">
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
