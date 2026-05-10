'use client';

import { useEffect, useState } from 'react';
import { getAllOrders } from '@/services/orders.service';
import { Order } from '@/types/order.type';
import Image from 'next/image';
import {
  User2Icon,
  Search,
  Filter,
  ChevronDown,
  X,
  Eye,
  Package,
  Calendar,
  DollarSign,
  Phone,
  Mail,
  ArrowUpDown,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
} from 'lucide-react';

const Page = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAllOrders();
        setOrders(res?.data || []);
        setFilteredOrders(res?.data || []);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...orders];

    if (searchTerm) {
      result = result.filter(
        order =>
          order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.phone?.includes(searchTerm),
      );
    }

    if (statusFilter !== 'ALL') {
      result = result.filter(order => order.status === statusFilter);
    }

    if (dateRange.start) {
      result = result.filter(
        order => new Date(order.createdAt) >= new Date(dateRange.start),
      );
    }
    if (dateRange.end) {
      result = result.filter(
        order => new Date(order.createdAt) <= new Date(dateRange.end),
      );
    }

    result.sort((a, b) => {
      let compareA: any = a[sortBy as keyof Order];
      let compareB: any = b[sortBy as keyof Order];

      if (sortBy === 'date') {
        compareA = new Date(a.createdAt);
        compareB = new Date(b.createdAt);
      }
      if (sortBy === 'total') {
        compareA = a.total;
        compareB = b.total;
      }
      if (sortBy === 'customer') {
        compareA = a.user?.name || '';
        compareB = b.user?.name || '';
      }

      if (sortOrder === 'asc') {
        return compareA > compareB ? 1 : -1;
      } else {
        return compareA < compareB ? 1 : -1;
      }
    });

    setFilteredOrders(result);
  }, [searchTerm, statusFilter, sortBy, sortOrder, dateRange, orders]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'PENDING':
        return {
          icon: Clock,
          label: 'Pending',
          className:
            'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
        };
      case 'DELIVERED':
        return {
          icon: CheckCircle,
          label: 'Delivered',
          className:
            'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        };
      case 'PROCESSING':
        return {
          icon: Truck,
          label: 'Processing',
          className:
            'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        };
      case 'CANCELLED':
        return {
          icon: XCircle,
          label: 'Cancelled',
          className:
            'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        };
      default:
        return {
          icon: Clock,
          label: status,
          className:
            'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
        };
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('ALL');
    setDateRange({ start: '', end: '' });
    setSortBy('date');
    setSortOrder('desc');
  };

  const hasActiveFilters =
    searchTerm || statusFilter !== 'ALL' || dateRange.start || dateRange.end;

  const totalRevenue = filteredOrders.reduce(
    (sum, order) => sum + order.total,
    0,
  );
  const averageOrderValue =
    filteredOrders.length > 0 ? totalRevenue / filteredOrders.length : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="px-4 py-4 sm:px-6 lg:px-8 ">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Orders
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage and track all customer orders
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-sm border border-gray-200 dark:border-gray-800 p-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Total Orders
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">
              {filteredOrders.length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-sm border border-gray-200 dark:border-gray-800 p-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">Revenue</p>
            <p className="text-xl font-bold text-green-600 dark:text-green-400 mt-1">
              ${totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-sm border border-gray-200 dark:border-gray-800 p-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Avg Order
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">
              ${averageOrderValue.toFixed(2)}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-sm border border-gray-200 dark:border-gray-800 p-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">Pending</p>
            <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">
              {orders.filter(o => o.status === 'PENDING').length}
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-900 rounded-sm border border-gray-200 dark:border-gray-800 mb-6">
          <div className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by order ID, customer, email, or phone..."
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-sm text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Filter className="w-4 h-4 inline mr-2" />
                  Filters
                </button>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-sm text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  >
                    <option value="ALL">All Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Sort By
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-sm text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    >
                      <option value="date">Date</option>
                      <option value="total">Total</option>
                      <option value="customer">Customer</option>
                    </select>
                    <button
                      onClick={() =>
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                      }
                      className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <ArrowUpDown className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    From Date
                  </label>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={e =>
                      setDateRange({ ...dateRange, start: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-sm text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    To Date
                  </label>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={e =>
                      setDateRange({ ...dateRange, end: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-sm text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredOrders.length} order
            {filteredOrders.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Mobile Card View - shows on mobile, hidden on desktop */}
        <div className="block lg:hidden space-y-3">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-sm border border-gray-200 dark:border-gray-800">
              <Package className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">
                No orders found
              </p>
            </div>
          ) : (
            filteredOrders.map(order => {
              const StatusIcon = getStatusConfig(order.status).icon;
              const statusConfig = getStatusConfig(order.status);

              return (
                <div
                  key={order.id}
                  className="bg-white dark:bg-gray-900 rounded-sm border border-gray-200 dark:border-gray-800 p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        #{order.id?.slice(0, 8)}...
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig.className}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig.label}
                        </span>
                      </div>
                    </div>
                    <p className="text-base font-bold text-gray-900 dark:text-white">
                      ${order.total.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 py-3 border-y border-gray-100 dark:border-gray-800">
                    {order?.user?.avatar ? (
                      <Image
                        src={order.user.avatar}
                        alt={order.user.name || 'user'}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <User2Icon className="w-5 h-5 text-gray-500" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {order.user?.name || 'Guest User'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {order.user?.email || 'No email'}
                      </p>
                      {order.phone && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {order.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        Items:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {order.items.length} products
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        Date:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>

                  <details className="mt-3">
                    <summary className="text-xs text-blue-500 cursor-pointer">
                      View items ({order.items.length})
                    </summary>
                    <div className="mt-2 space-y-1 pl-2">
                      {order.items.map(item => (
                        <div
                          key={item.id}
                          className="text-xs text-gray-600 dark:text-gray-400"
                        >
                          • {item.name} × {item.quantity}
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              );
            })
          )}
        </div>

        {/* Desktop Table View - hidden on mobile */}
        <div className="hidden lg:block bg-white dark:bg-gray-900 rounded-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">
                No orders found
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Items
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Total
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => {
                  const StatusIcon = getStatusConfig(order.status).icon;
                  const statusConfig = getStatusConfig(order.status);

                  return (
                    <tr
                      key={order.id}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          #{order.id?.slice(0, 8)}...
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {order?.user?.avatar ? (
                            <Image
                              src={order.user.avatar}
                              alt={order.user.name || 'user'}
                              width={32}
                              height={32}
                              className="rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                              <User2Icon className="w-4 h-4 text-gray-500" />
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {order.user?.name || 'Guest'}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {order.user?.email || ''}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {order.phone || '—'}
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-400">
                        {order.items.length}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          ${order.total.toLocaleString()}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.className}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
