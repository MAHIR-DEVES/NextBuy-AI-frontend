'use client';

import { getOrdersByUser } from '@/services/orders.service';
import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  User,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  ChevronDown,
  Calendar,
  Search,
} from 'lucide-react';

type Order = {
  id: string;
  total: number;
  status: string;
  name: string;
  phone: string;
  address: string;
  createdAt: string;
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
  user?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string | null;
  };
};

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await getOrdersByUser();
        setOrders(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // FILTER + SORT + SEARCH
  const filteredOrders = useMemo(() => {
    let data = [...orders];

    // Status filter
    if (statusFilter !== 'ALL') {
      data = data.filter(o => o.status === statusFilter);
    }

    // Search filter
    if (searchTerm) {
      data = data.filter(
        o =>
          o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          o.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          o.items.some(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }

    // Sort
    if (sortBy === 'newest') {
      data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    } else if (sortBy === 'oldest') {
      data.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    } else if (sortBy === 'highest') {
      data.sort((a, b) => b.total - a.total);
    } else if (sortBy === 'lowest') {
      data.sort((a, b) => a.total - b.total);
    }

    return data;
  }, [orders, statusFilter, sortBy, searchTerm]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'PENDING':
        return {
          color:
            'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
          icon: Clock,
          label: 'Pending',
        };
      case 'DELIVERED':
        return {
          color:
            'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
          icon: CheckCircle,
          label: 'Delivered',
        };
      case 'CANCELLED':
        return {
          color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
          icon: XCircle,
          label: 'Cancelled',
        };
      default:
        return {
          color:
            'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400',
          icon: Package,
          label: status,
        };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-4 md:p-6 lg:p-8 transition-colors duration-300">
      <div className="">
        {/* Header Section */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                My Orders
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base mt-1">
                Track and manage all your orders in one place
              </p>
            </div>

            {/* Stats Summary */}
            <div className="flex gap-3">
              <div className="bg-white dark:bg-gray-800 rounded-sm px-4 py-2 shadow-sm border border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Total Orders
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {orders.length}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-sm px-4 py-2 shadow-sm border border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Total Spent
                </p>
                <p className="text-xl font-bold text-orange-500 dark:text-orange-400">
                  $
                  {orders
                    .reduce((sum, order) => sum + order.total, 0)
                    .toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xs shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6 transition-colors duration-300">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order ID, product, or customer..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                className="appearance-none pl-4 pr-10 py-2 border border-gray-200 dark:border-gray-700 rounded-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Sort Filter */}
            <div className="relative">
              <select
                className="appearance-none pl-4 pr-10 py-2 border border-gray-200 dark:border-gray-700 rounded-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Amount</option>
                <option value="lowest">Lowest Amount</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Orders List - Card View for Mobile, Table for Desktop */}
        {loading ? (
          <div className="bg-white dark:bg-gray-800 rounded-xs shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              <p className="text-gray-500 dark:text-gray-400">
                Loading your orders...
              </p>
            </div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xs shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No orders found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm || statusFilter !== 'ALL'
                ? 'Try adjusting your filters'
                : "You haven't placed any orders yet"}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View (hidden on mobile) */}
            <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-xs shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Items
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredOrders.map(order => {
                      const statusConfig = getStatusConfig(order.status);
                      const StatusIcon = statusConfig.icon;

                      return (
                        <tr
                          key={order.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <span className="font-mono text-sm text-gray-900 dark:text-white">
                              #{order.id.slice(0, 12)}...
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {order.user?.avatar ? (
                                <Image
                                  src={order.user.avatar}
                                  alt={order.user.name}
                                  width={32}
                                  height={32}
                                  className="rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center">
                                  <User className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                                </div>
                              )}
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {order.user?.name || order.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {order.user?.email || order.phone}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              {order.items.slice(0, 2).map((item, idx) => (
                                <p
                                  key={idx}
                                  className="text-sm text-gray-600 dark:text-gray-300"
                                >
                                  {item.name} × {item.quantity}
                                </p>
                              ))}
                              {order.items.length > 2 && (
                                <p className="text-xs text-gray-400">
                                  +{order.items.length - 2} more items
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-lg font-semibold text-orange-500 dark:text-orange-400">
                              ${order.total.toFixed(2)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${statusConfig.color}`}
                            >
                              <StatusIcon className="w-3 h-3" />
                              {statusConfig.label}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                              <Calendar className="w-3 h-3" />
                              {formatDate(order.createdAt)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() =>
                                setExpandedOrder(
                                  expandedOrder === order.id ? null : order.id,
                                )
                              }
                              className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 text-sm font-medium transition-colors"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View (visible only on mobile) */}
            <div className="lg:hidden space-y-4">
              {filteredOrders.map(order => {
                const statusConfig = getStatusConfig(order.status);
                const StatusIcon = statusConfig.icon;
                const isExpanded = expandedOrder === order.id;

                return (
                  <div
                    key={order.id}
                    className="bg-white dark:bg-gray-800 rounded-xs shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300"
                  >
                    <div className="p-4">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                            #{order.id.slice(0, 12)}...
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full ${statusConfig.color}`}
                            >
                              <StatusIcon className="w-3 h-3" />
                              {statusConfig.label}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            setExpandedOrder(isExpanded ? null : order.id)
                          }
                          className="text-orange-500 hover:text-orange-600"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Customer Info */}
                      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100 dark:border-gray-700">
                        {order.user?.avatar ? (
                          <Image
                            src={order.user.avatar}
                            alt={order.user.name}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center">
                            <User className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {order.user?.name || order.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {order.user?.email || order.phone}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-orange-500 dark:text-orange-400">
                            ${order.total.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </div>

                      {/* Items Summary */}
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Items ({order.items.length})
                        </p>
                        {order.items
                          .slice(0, isExpanded ? undefined : 2)
                          .map((item, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between text-sm"
                            >
                              <span className="text-gray-600 dark:text-gray-300">
                                {item.name} × {item.quantity}
                              </span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        {!isExpanded && order.items.length > 2 && (
                          <button
                            onClick={() => setExpandedOrder(order.id)}
                            className="text-xs text-orange-500 mt-1"
                          >
                            + {order.items.length - 2} more items
                          </button>
                        )}
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                          <div className="space-y-2">
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Shipping Address
                              </p>
                              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                {order.address}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Phone
                              </p>
                              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                {order.phone}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
