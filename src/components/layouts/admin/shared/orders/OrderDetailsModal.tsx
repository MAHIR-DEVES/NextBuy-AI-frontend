'use client';

import { X } from 'lucide-react';

import { Order } from '@/types/orders';

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
}

const getOrderQuantity = (order: Order) => {
  if (typeof order.quantity === 'number') {
    return order.quantity;
  }

  return (
    order.items?.reduce((total, item) => total + (item.quantity || 0), 0) || 0
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>

      <p className="mt-1 break-words text-sm font-medium">{value || '-'}</p>
    </div>
  );
};

const OrderDetailsModal = ({ order, onClose }: OrderDetailsModalProps) => {
  return (
    <div
      className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-background shadow-xl"
      onMouseDown={e => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b p-5">
        <div>
          <h2 className="text-lg font-bold">Order Details</h2>

          <p className="mt-1 break-all text-xs text-muted-foreground">
            {order.id}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 hover:bg-muted"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Customer Info */}
      <div className="grid gap-4 p-5 sm:grid-cols-2">
        <Detail
          label="Customer Name"
          value={order.name || order.user?.name || '-'}
        />

        <Detail label="Phone" value={order.phone || order.user?.phone || '-'} />

        <Detail label="Email" value={order.user?.email || '-'} />

        <Detail label="Address" value={order.address || '-'} />

        <Detail
          label="Delivery Area"
          value={order.isInsideDhaka ? 'Inside Dhaka' : 'Outside Dhaka'}
        />

        <Detail
          label="Total Quantity"
          value={String(getOrderQuantity(order))}
        />

        <Detail
          label="Order Total"
          value={`৳ ${order.total ?? order.totalAmount ?? 0}`}
        />

        <Detail label="Status" value={order.status} />

        <Detail
          label="Order Date"
          value={
            order.createdAt ? new Date(order.createdAt).toLocaleString() : '-'
          }
        />
      </div>

      {/* Order Items */}
      {order.items?.length ? (
        <div className="border-t p-5">
          <h3 className="mb-3 font-semibold">Order Items</h3>

          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div
                key={item.id || `${item.productId}-${index}`}
                className="flex items-center justify-between gap-4 rounded-lg border p-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {item.name || 'Product'}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Product ID: {item.productId}
                  </p>

                  {typeof item.price === 'number' && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Price: ৳{item.price}
                    </p>
                  )}
                </div>

                <span className="shrink-0 text-sm font-semibold">
                  × {item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Footer */}
      <div className="flex justify-end border-t p-5">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
