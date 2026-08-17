'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { getAllOrders } from '@/services/orders.service';

import { GetAllOrdersResponse, Order, OrderStatus } from '@/types/orders';

import CustomerContactHeader from '../shared/orders/CustomerContactHeader';
import CustomerContactTable from './CustomerContactTable';
import OrderSummary from '../shared/orders/OrderSummary';
import OrderDetailsModal from '../shared/orders/OrderDetailsModal';
import { toast } from 'sonner';

const ITEMS_PER_PAGE = 10;

const CustomerContact = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<OrderStatus | 'ALL'>('ALL');

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [meta, setMeta] = useState({
    page: 1,
    limit: ITEMS_PER_PAGE,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [summary, setSummary] = useState({
    totalOrders: 0,
    totalPending: 0,
    totalShipped: 0,
    totalDelivered: 0,
    totalCancelled: 0,
    totalPartial: 0,
  });

  // ==============================
  // FETCH ORDERS
  // ==============================

  useEffect(() => {
    let cancelled = false;

    const fetchOrders = async () => {
      try {
        setLoading(true);

        const response = await getAllOrders({
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          search: search.trim(),
          status: status === 'ALL' ? undefined : status,
        });

        const data = response?.data;

        setOrders(Array.isArray(data?.orders) ? data.orders : []);

        if (data?.meta) {
          setMeta(data.meta);
        }

        if (data?.summary) {
          setSummary(data.summary);
        }
      } catch (error) {
        if (cancelled) return;

        console.error('Failed to fetch orders:', error);

        setOrders([]);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchOrders();

    return () => {
      cancelled = true;
    };
  }, [currentPage, search, status]);

  // ==============================
  // SEARCH
  // ==============================

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
    setSelectedIds([]);
  };

  // ==============================
  // STATUS
  // ==============================

  const handleStatusChange = (value: OrderStatus | 'ALL') => {
    setStatus(value);
    setCurrentPage(1);
    setSelectedIds([]);
  };

  // ==============================
  // PAGINATION
  // ==============================

  const changePage = (page: number) => {
    if (page < 1 || page > meta.totalPages) {
      return;
    }

    setCurrentPage(page);
    setSelectedIds([]);
  };

  const paginationPages = useMemo(() => {
    const totalPages = meta.totalPages;
    const current = meta.page;

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (current <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (current >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [current - 2, current - 1, current, current + 1, current + 2];
  }, [meta.totalPages, meta.page]);

  // ==============================
  // SELECT
  // ==============================

  const allSelected =
    orders.length > 0 && orders.every(order => selectedIds.includes(order.id));

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(prev =>
        prev.filter(id => !orders.some(order => order.id === id)),
      );

      return;
    }

    setSelectedIds(prev => {
      const ids = new Set(prev);

      orders.forEach(order => {
        ids.add(order.id);
      });

      return Array.from(ids);
    });
  };

  const handleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const selectedOrders = useMemo(
    () => orders.filter(order => selectedIds.includes(order.id)),
    [orders, selectedIds],
  );

  // ==============================
  // COPY PHONES
  // ==============================

  const handleCopyPhones = async () => {
    const phones = selectedOrders
      .map(order => order.phone || order.user?.phone)
      .filter(Boolean);

    if (!phones.length) {
      toast.warning('Please select at least one order');
      return;
    }

    try {
      await navigator.clipboard.writeText(phones.join('\n'));

      toast.warning(
        `${phones.length} phone number${phones.length > 1 ? 's' : ''} copied`,
      );
    } catch (error) {
      console.error('Failed to copy phones:', error);
    }
  };

  // ==============================
  // CSV
  // ==============================

  const handleExportCSV = () => {
    const exportOrders = selectedIds.length > 0 ? selectedOrders : orders;

    if (!exportOrders.length) {
      toast.warning('No orders to export');
      return;
    }

    const headers = [
      'Order ID',
      'Name',
      'Phone',
      'Email',
      'Address',
      'Delivery Area',
      'Quantity',
      'Total',
      'Status',
      'Created At',
    ];

    const rows = exportOrders.map(order => [
      order.id,
      order.name || order.user?.name || '',
      order.phone || order.user?.phone || '',
      order.user?.email || '',
      order.address || '',
      order.isInsideDhaka ? 'Inside Dhaka' : 'Outside Dhaka',
      getOrderQuantity(order),
      order.total ?? order.totalAmount ?? 0,
      order.status,
      order.createdAt ? new Date(order.createdAt).toLocaleString() : '',
    ]);

    const csv = [headers, ...rows]
      .map(row =>
        row
          .map(value => `"${String(value ?? '').replace(/"/g, '""')}"`)
          .join(','),
      )
      .join('\n');

    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;

    link.download = `orders-${new Date().toISOString().slice(0, 10)}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // ==============================
  // UI
  // ==============================

  return (
    <div className="space-y-5 ">
      <CustomerContactHeader
        search={search}
        status={status}
        selectedCount={selectedIds.length}
        orderCount={meta.total}
        hasOrders={orders.length > 0}
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
        onCopyPhones={handleCopyPhones}
        onExportCSV={handleExportCSV}
      />

      <OrderSummary {...summary} />

      <CustomerContactTable
        orders={orders}
        meta={meta}
        selectedIds={selectedIds}
        paginationPages={paginationPages}
        onSelectAll={handleSelectAll}
        onSelect={handleSelect}
        onView={setSelectedOrder}
        onPageChange={changePage}
        loading={loading}
      />

      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={() => setSelectedOrder(null)}
        >
          <OrderDetailsModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        </div>
      )}
    </div>
  );
};

// ==============================
// HELPERS
// ==============================

const getOrderQuantity = (order: Order) => {
  if (typeof order.quantity === 'number') {
    return order.quantity;
  }

  return (
    order.items?.reduce((total, item) => total + (item.quantity || 0), 0) || 0
  );
};

export default CustomerContact;
