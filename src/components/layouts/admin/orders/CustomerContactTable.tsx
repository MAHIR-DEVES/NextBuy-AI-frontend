'use client';

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Loader2,
  Pencil,
  Phone,
  StickyNote,
  Trash2,
} from 'lucide-react';

import { Order, OrdersMeta, OrderStatus } from '@/types/orders';

import LoadingSpinner from '../shared/dashboard/LoadingSpinner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import EditOrderModal from './EditOrderModal';
import OrderNoteModal from './OrderNoteModal';

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
  onView,
  onPageChange,
  onUpdateStatus,
  onDelete,
  updatingOrderId = null,
  deletingOrderId = null,
  loading = false,
}: CustomerContactTableProps) => {
  const router = useRouter();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  const allSelected =
    orders.length > 0 && orders.every(order => selectedIds.includes(order.id));

  const handleRowClick = (order: Order) => {
    router.push(`/admin/order-details/${order.id}`);
  };

  const stopRowNavigation = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  return (
    <div className="w-full overflow-x-auto rounded-md border bg-background [-webkit-overflow-scrolling:touch]">
      <div className="min-w-[1500px]">
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <LoadingSpinner message="orders" />
          </div>
        ) : orders.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="font-medium">No orders found</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Try changing your search or filter.
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40">
              <tr>
                <th className="w-12 px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={onSelectAll}
                    onClick={stopRowNavigation}
                    className="h-4 w-4 cursor-pointer"
                    aria-label="Select all orders"
                  />
                </th>

                <th className="px-4 py-3 text-left">Customer</th>

                <th className="px-4 py-3 text-left">Phone</th>

                <th className="px-4 py-3 text-left">Address</th>

                <th className="min-w-[300px] px-4 py-3 text-left">Products</th>

                <th className="px-4 py-3 text-center">Quantity</th>

                <th className="px-4 py-3 text-right">Total</th>

                <th className="px-4 py-3 text-center">Status</th>

                <th className="px-4 py-3 text-left">Note</th>

                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {orders.map(order => {
                const selected = selectedIds.includes(order.id);

                const isUpdating = updatingOrderId === order.id;

                const isDeleting = deletingOrderId === order.id;

                const totalQuantity = getOrderQuantity(order);

                return (
                  <tr
                    key={order.id}
                    onClick={() => handleRowClick(order)}
                    onKeyDown={event => {
                      if (
                        event.key === 'Enter' &&
                        event.target === event.currentTarget
                      ) {
                        handleRowClick(order);
                      }
                    }}
                    tabIndex={0}
                    aria-label={`View order details for ${order.name || order.user?.name || 'customer'}`}
                    className={`cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${
                      selected ? 'bg-primary/5' : 'hover:bg-muted/30'
                    }`}
                  >
                    {/* SELECT */}
                    <td
                      className="px-4 py-4 text-center"
                      onClick={stopRowNavigation}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => onSelect(order.id)}
                        disabled={isUpdating || isDeleting}
                        className="h-4 w-4 cursor-pointer"
                        aria-label={`Select order ${order.id}`}
                      />
                    </td>

                    {/* CUSTOMER */}
                    <td className="px-4 py-4">
                      <div className="max-w-[180px]">
                        <p className="truncate font-semibold">
                          {order.name || order.user?.name || '-'}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          ID: {order.id.slice(0, 8)}
                        </p>
                      </div>
                    </td>

                    {/* PHONE */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className="whitespace-nowrap text-sm text-gray-700">
                          {order.phone || order.user?.phone || '-'}
                        </span>

                        {(order.phone || order.user?.phone) && (
                          <a
                            href={`tel:${order.phone || order.user?.phone}`}
                            onClick={stopRowNavigation}
                            title="Call customer"
                            aria-label={`Call ${order.phone || order.user?.phone}`}
                            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-gray-200 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                          >
                            <Phone size={16} strokeWidth={1.8} />
                          </a>
                        )}
                      </div>
                    </td>

                    {/* ADDRESS */}
                    <td className="px-4 py-4">
                      <div className="max-w-[230px] space-y-1">
                        <p className=" font-medium" title={order.address || ''}>
                          {order.address || '-'}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          District: {order.district || '-'}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          Thana: {order.thana || '-'}
                        </p>

                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${
                            order.isInsideDhaka
                              ? 'bg-green-50 text-green-700'
                              : 'bg-blue-50 text-blue-700'
                          }`}
                        >
                          {order.isInsideDhaka
                            ? 'Inside Dhaka'
                            : 'Outside Dhaka'}
                        </span>
                      </div>
                    </td>

                    {/* PRODUCTS */}
                    <td className="px-4 py-4">
                      {order.items && order.items.length > 0 ? (
                        <div className="space-y-3">
                          {order.items.map((item, index) => (
                            <div
                              key={item.id || `${item.productId}-${index}`}
                              className="border-b border-border/60 pb-3 last:border-0 last:pb-0"
                            >
                              <p
                                className="max-w-[300px] truncate font-medium leading-5"
                                title={item.name || ''}
                              >
                                {item.name || 'Unnamed product'}
                              </p>

                              <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                <span>Qty: {item.quantity ?? 0}</span>

                                <span>•</span>

                                <span>Size: {item.size || '-'}</span>

                                <span>•</span>

                                <span>Color: {item.color || '-'}</span>
                              </div>

                              <p className="mt-1 text-xs font-semibold text-foreground">
                                Price: ৳
                                {Number(item.price || 0).toLocaleString(
                                  'en-BD',
                                )}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">
                          No products
                        </span>
                      )}
                    </td>

                    {/* QUANTITY */}
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex min-w-8 items-center justify-center rounded-md bg-muted px-2 py-1 font-semibold">
                        {totalQuantity}
                      </span>
                    </td>

                    {/* TOTAL */}
                    <td className="px-4 py-4 text-right">
                      <span className="whitespace-nowrap font-bold">
                        ৳{Number(order.total || 0).toLocaleString('en-BD')}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td
                      className="px-4 py-4 text-center"
                      onClick={stopRowNavigation}
                    >
                      <div className="relative inline-flex">
                        <select
                          value={order.status}
                          disabled={isUpdating || isDeleting}
                          onChange={async event => {
                            const newStatus = event.target.value as OrderStatus;

                            if (newStatus === order.status) {
                              return;
                            }

                            await onUpdateStatus(order.id, newStatus);
                          }}
                          onClick={stopRowNavigation}
                          className={`h-9 min-w-[120px] appearance-none rounded-md border px-3 pr-8 text-xs font-semibold outline-none transition-colors focus:border-primary disabled:cursor-not-allowed disabled:opacity-60 ${getStatusClass(
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

                    {/* NOTE */}
                    <td className="px-4 py-4">
                      <p
                        className="max-w-[150px] truncate text-muted-foreground"
                        title={order.note || ''}
                      >
                        {order.note || '-'}
                      </p>
                    </td>

                    {/* ACTIONS */}
                    <td
                      className="px-4 py-4 text-center"
                      onClick={stopRowNavigation}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {/* EDIT */}
                        <button
                          type="button"
                          title="Edit order"
                          aria-label="Edit order"
                          disabled={isDeleting || isUpdating}
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsEditModalOpen(true);
                          }}
                          className="inline-flex h-9 items-center justify-center rounded-md border px-3 text-xs font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>

                        {/* NOTE */}
                        <button
                          type="button"
                          title="Edit order note"
                          aria-label="Edit order note"
                          disabled={isDeleting || isUpdating}
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsNoteModalOpen(true);
                          }}
                          className="inline-flex h-9 items-center justify-center rounded-md border px-3 text-xs font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <StickyNote className="h-4 w-4" />
                        </button>

                        {/* DELETE */}
                        <button
                          type="button"
                          title="Delete order"
                          aria-label="Delete order"
                          disabled={isDeleting || isUpdating}
                          onClick={() => onDelete(order.id)}
                          className="inline-flex h-9 items-center justify-center rounded-md border border-red-500/20 px-3 text-xs font-medium text-red-600 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
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

      {/* EDIT ORDER MODAL */}
      {selectedOrder && (
        <EditOrderModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          order={selectedOrder}
          fetchOrders={fetchOrders}
        />
      )}

      {/* ORDER NOTE MODAL */}
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
                aria-label="Previous page"
                className="h-9 w-9 rounded-md border transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="mx-auto h-4 w-4" />
              </button>

              {/* PAGE NUMBERS */}
              {paginationPages.map(page => (
                <button
                  key={page}
                  type="button"
                  onClick={() => onPageChange(page)}
                  aria-current={meta.page === page ? 'page' : undefined}
                  className={`h-9 min-w-9 rounded-md px-2 text-sm transition-colors ${
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
                aria-label="Next page"
                className="h-9 w-9 rounded-md border transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
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

// ==================================
// ORDER QUANTITY
// ==================================

const getOrderQuantity = (order: Order): number => {
  if (typeof order.quantity === 'number') {
    return order.quantity;
  }

  return (
    order.items?.reduce((total, item) => total + (item.quantity || 0), 0) || 0
  );
};

// ==================================
// ORDER STATUS CLASS
// ==================================

const getStatusClass = (status: OrderStatus): string => {
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
