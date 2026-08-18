'use client';

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Loader2,
  Pencil,
  StickyNote,
  Trash2,
} from 'lucide-react';

import { Order, OrdersMeta, OrderStatus } from '@/types/orders';

import LoadingSpinner from '../shared/dashboard/LoadingSpinner';
import { useState } from 'react';
import EditOrderModal from './EditOrderModal';
import OrderNoteModal from './OrderNoteModal';
import Link from 'next/link';

interface CustomerContactTableProps {
  orders: Order[];
  meta: OrdersMeta;
  selectedIds: string[];
  paginationPages: number[];
  fetchOrders: () => Promise<void>;
  onSelectAll: () => void;
  onSelect: (id: string) => void;
  onView: (order: Order) => void;
  onPageChange: (page: number) => void;

  onUpdateStatus: (orderId: string, status: OrderStatus) => Promise<void>;

  onDelete: (orderId: string) => Promise<void>;

  updatingOrderId?: string | null;
  deletingOrderId?: string | null;

  loading?: boolean;
}

const CustomerContactTable = ({
  orders,
  meta,
  selectedIds,
  paginationPages,
  fetchOrders,
  onSelectAll,
  onSelect,
  onPageChange,
  onUpdateStatus,
  onDelete,
  updatingOrderId = null,
  deletingOrderId = null,
  loading = false,
}: CustomerContactTableProps) => {
  const allSelected =
    orders.length > 0 && orders.every(order => selectedIds.includes(order.id));
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  return (
    <div className="w-full overflow-x-auto rounded-md border bg-background [-webkit-overflow-scrolling:touch]">
      {/* TABLE */}

      <div className="min-w-[1200px]">
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <LoadingSpinner message={'orders'} />
          </div>
        ) : orders.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="font-medium">No orders found</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Try changing your search or filter.
            </p>
          </div>
        ) : (
          <table className="w-full min-w-[1200px] text-sm">
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
                <th className="px-4 py-3 text-center">Note</th>

                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {orders.map(order => {
                const selected = selectedIds.includes(order.id);

                const isUpdating = updatingOrderId === order.id;

                const isDeleting = deletingOrderId === order.id;

                return (
                  <tr
                    key={order.id}
                    className={selected ? 'bg-primary/5' : 'hover:bg-muted/30'}
                  >
                    {/* SELECT */}
                    <td className="px-4 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => onSelect(order.id)}
                        disabled={isUpdating || isDeleting}
                        className="h-4 w-4"
                      />
                    </td>
                    {/* CUSTOMER */}
                    <td className="px-4 py-4 font-medium">
                      {order.name || order.user?.name || '-'}
                    </td>
                    {/* PHONE */}
                    <td className="px-4 py-4 font-medium">
                      {order.phone || order.user?.phone || '-'}
                    </td>
                    {/* EMAIL */}
                    <td className="px-4 py-4">{order.user?.email || '-'}</td>
                    {/* ADDRESS */}
                    <td className="max-w-[280px] px-4 py-4">
                      <p className="truncate">{order.address || '-'}</p>

                      <span className="text-xs text-muted-foreground">
                        {order.isInsideDhaka ? 'Inside Dhaka' : 'Outside Dhaka'}
                      </span>
                    </td>
                    {/* QUANTITY */}
                    <td className="px-4 py-4 text-center">
                      {getOrderQuantity(order)}
                    </td>

                    {/* STATUS */}
                    <td className="px-4 py-4 text-center">
                      <div className="relative inline-flex">
                        <select
                          value={order.status}
                          disabled={isUpdating || isDeleting}
                          onChange={async e => {
                            const newStatus = e.target.value as OrderStatus;

                            if (newStatus === order.status) {
                              return;
                            }

                            await onUpdateStatus(order.id, newStatus);
                          }}
                          className={`h-9 min-w-[110px] appearance-none rounded-md border px-3 pr-8 text-xs font-semibold outline-none transition-colors focus:border-primary disabled:cursor-not-allowed disabled:opacity-60 ${getStatusClass(
                            order.status,
                          )}`}
                        >
                          <option value="PENDING">Pending</option>
                          <option value="SHIPPED">Shipped</option>
                          <option value="DELIVERED">Delivered</option>
                          <option value="CANCELLED">Cancelled</option>
                          <option value="PARTIAL">Partial</option>
                        </select>

                        {isUpdating ? (
                          <Loader2 className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 animate-spin text-primary" />
                        ) : (
                          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2" />
                        )}
                      </div>
                    </td>

                    {/* note */}
                    <td className="px-4 py-4 text-center">{order?.note}</td>
                    {/* ACTION */}
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {/* VIEW */}

                        <Link href={`/admin/order-details/${order.id}`}>
                          <button
                            type="button"
                            className="inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-xs font-medium hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </Link>
                        {/* Edit */}
                        <button
                          type="button"
                          disabled={isDeleting || isUpdating}
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsEditModalOpen(true);
                          }}
                          className="inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-xs font-medium hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>

                        {/* Note */}
                        <button
                          type="button"
                          disabled={isDeleting || isUpdating}
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsNoteModalOpen(true);
                          }}
                          className="inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-xs font-medium hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <StickyNote className="h-4 w-4" />
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          disabled={isDeleting || isUpdating}
                          onClick={() => onDelete(order.id)}
                          className={`inline-flex h-9 items-center gap-1.5 rounded-md border border-red-500/20 px-3 text-xs font-medium text-red-600 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50`}
                        >
                          {isDeleting ? (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-600/30 border-t-red-600" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {selectedOrder && (
        <EditOrderModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          order={selectedOrder}
          fetchOrders={fetchOrders}
        />
      )}

      {selectedOrder && (
        <OrderNoteModal
          open={isNoteModalOpen}
          onOpenChange={setIsNoteModalOpen}
          order={selectedOrder}
          fetchOrders={fetchOrders}
        />
      )}

      {/* PAGINATION */}

      {!loading && orders.length > 0 && (
        <div className="flex flex-col gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(meta.page - 1) * meta.limit + 1} -{' '}
            {Math.min(meta.page * meta.limit, meta.total)} of {meta.total}
          </p>

          {meta.totalPages > 1 && (
            <div className="flex items-center gap-1">
              {/* PREVIOUS */}

              <button
                type="button"
                onClick={() => onPageChange(meta.page - 1)}
                disabled={!meta.hasPreviousPage}
                className="h-9 w-9 rounded-md border disabled:opacity-40"
              >
                <ChevronLeft className="mx-auto h-4 w-4" />
              </button>

              {/* PAGES */}

              {paginationPages.map(page => (
                <button
                  key={page}
                  type="button"
                  onClick={() => onPageChange(page)}
                  className={`h-9 min-w-9 rounded-md px-2 text-sm ${
                    meta.page === page
                      ? 'bg-primary text-primary-foreground'
                      : 'border hover:bg-muted'
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* NEXT */}

              <button
                type="button"
                onClick={() => onPageChange(meta.page + 1)}
                disabled={!meta.hasNextPage}
                className="h-9 w-9 rounded-md border disabled:opacity-40"
              >
                <ChevronRight className="mx-auto h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ==============================
// QUANTITY
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
// STATUS CLASS
// ==============================

const getStatusClass = (status: OrderStatus) => {
  const classes: Record<OrderStatus, string> = {
    PENDING: 'bg-amber-50 text-amber-700 border-amber-200',

    SHIPPED: 'bg-blue-50 text-blue-700 border-blue-200',

    DELIVERED: 'bg-green-50 text-green-700 border-green-200',

    CANCELLED: 'bg-red-50 text-red-700 border-red-200',

    PARTIAL: 'bg-purple-50 text-purple-700 border-purple-200',
  };

  return classes[status];
};

export default CustomerContactTable;
