'use client';

import { useState } from 'react';
import { Loader2, Printer } from 'lucide-react';

import { updateOrderStatus } from '@/services/orders.service';

import { OrderStatus } from '@/types/orders';

interface OrderActionsProps {
  orderId: string;
  currentStatus: OrderStatus;
}

const OrderActions = ({ orderId, currentStatus }: OrderActionsProps) => {
  const [status, setStatus] = useState<OrderStatus>(currentStatus);

  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (newStatus === status) return;

    try {
      setLoading(true);

      await updateOrderStatus(orderId, newStatus);

      setStatus(newStatus);
    } catch (error) {
      console.error('Failed to update order status:', error);

      alert('Failed to update order status');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex items-center gap-2">
      {/* STATUS */}
      <div className="relative">
        <select
          value={status}
          disabled={loading}
          onChange={e => handleStatusChange(e.target.value as OrderStatus)}
          className="h-10 min-w-[130px] rounded-md border bg-background px-3 text-sm font-medium capitalize outline-none focus:border-primary disabled:opacity-50"
        >
          <option value="PENDING">Pending</option>
          <option value="SHIPPED">Shipped</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="PARTIAL">Partial</option>
        </select>

        {loading && (
          <Loader2 className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin" />
        )}
      </div>

      {/* PRINT */}
      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex h-10 items-center gap-2 rounded-md border px-4 text-sm font-medium hover:bg-muted"
      >
        <Printer className="h-4 w-4" />
        Print
      </button>
    </div>
  );
};

export default OrderActions;
