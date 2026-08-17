'use client';

import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';

import { Order, OrdersMeta, OrderStatus } from '@/types/orders';
import LoadingSpinner from '../shared/dashboard/LoadingSpinner';

interface CustomerContactTableProps {
  orders: Order[];
  meta: OrdersMeta;
  selectedIds: string[];
  paginationPages: number[];

  onSelectAll: () => void;
  onSelect: (id: string) => void;
  onView: (order: Order) => void;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

const CustomerContactTable = ({
  orders,
  meta,
  selectedIds,
  paginationPages,
  onSelectAll,
  onSelect,
  onView,
  loading = false,
  onPageChange,
}: CustomerContactTableProps) => {
  const allSelected =
    orders.length > 0 && orders.every(order => selectedIds.includes(order.id));

  return (
    <div className="overflow-hidden rounded-md border bg-background">
      <div className="overflow-x-auto">
        {loading ? (
          <>
            <LoadingSpinner />
          </>
        ) : (
          <>
            <table className="w-full min-w-[1000px] text-sm">
              <thead className="border-b bg-muted/40">
                <tr>
                  <th className="w-12 px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={onSelectAll}
                      className="h-4 w-4"
                    />
                  </th>

                  <th className="px-4 py-3 text-left">Customer</th>

                  <th className="px-4 py-3 text-left">Phone</th>

                  <th className="px-4 py-3 text-left">Email</th>

                  <th className="px-4 py-3 text-left">Address</th>

                  <th className="px-4 py-3 text-center">Quantity</th>

                  <th className="px-4 py-3 text-center">Status</th>

                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {orders.map(order => {
                  const selected = selectedIds.includes(order.id);

                  return (
                    <tr
                      key={order.id}
                      className={
                        selected ? 'bg-primary/5' : 'hover:bg-muted/30'
                      }
                    >
                      <td className="px-4 py-4 text-center">
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => onSelect(order.id)}
                          className="h-4 w-4"
                        />
                      </td>

                      <td className="px-4 py-4 font-medium">
                        {order.name || order.user?.name || '-'}
                      </td>

                      <td className="px-4 py-4 font-medium">
                        {order.phone || order.user?.phone || '-'}
                      </td>

                      <td className="px-4 py-4">{order.user?.email || '-'}</td>

                      <td className="max-w-[280px] px-4 py-4">
                        <p className="truncate">{order.address || '-'}</p>

                        <span className="text-xs text-muted-foreground">
                          {order.isInsideDhaka
                            ? 'Inside Dhaka'
                            : 'Outside Dhaka'}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-center">
                        {getOrderQuantity(order)}
                      </td>

                      <td className="px-4 py-4 text-center">
                        <StatusBadge status={order.status} />
                      </td>

                      <td className="px-4 py-4 text-center">
                        <button
                          type="button"
                          onClick={() => onView(order)}
                          className="inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-xs font-medium hover:bg-muted"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {(meta.page - 1) * meta.limit + 1} -{' '}
          {Math.min(meta.page * meta.limit, meta.total)} of {meta.total}
        </p>

        {meta.totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onPageChange(meta.page - 1)}
              disabled={!meta.hasPreviousPage}
              className="h-9 w-9 rounded-lg border disabled:opacity-40"
            >
              <ChevronLeft className="mx-auto h-4 w-4" />
            </button>

            {paginationPages.map(page => (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                className={`h-9 min-w-9 rounded-lg px-2 text-sm ${
                  meta.page === page
                    ? 'bg-primary text-primary-foreground'
                    : 'border hover:bg-muted'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => onPageChange(meta.page + 1)}
              disabled={!meta.hasNextPage}
              className="h-9 w-9 rounded-lg border disabled:opacity-40"
            >
              <ChevronRight className="mx-auto h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ==============================
// Quantity
// ==============================

const getOrderQuantity = (order: Order) => {
  if (typeof order.quantity === 'number') {
    return order.quantity;
  }

  return (
    order.items?.reduce((total, item) => total + (item.quantity || 0), 0) || 0
  );
};

// ==============================
// Status
// ==============================

const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const classes: Record<OrderStatus, string> = {
    PENDING: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',

    SHIPPED: 'bg-blue-500/10 text-blue-600 border-blue-500/20',

    DELIVERED: 'bg-green-500/10 text-green-600 border-green-500/20',

    CANCELLED: 'bg-red-500/10 text-red-600 border-red-500/20',

    PARTIAL: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
        classes[status]
      }`}
    >
      {status}
    </span>
  );
};

export default CustomerContactTable;
