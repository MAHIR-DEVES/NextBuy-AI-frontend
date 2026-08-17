'use client';

import { Loader2, X } from 'lucide-react';
import { useState } from 'react';

import { Order } from '@/types/orders';
import { updateOrder } from '@/services/orders.service';
import { toast } from 'sonner';

interface OrderNoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
  onUpdated?: (order: Order) => void;
  fetchOrders: () => Promise<void>;
}

const OrderNoteModal = ({
  open,
  onOpenChange,
  order,
  onUpdated,
  fetchOrders,
}: OrderNoteModalProps) => {
  if (!open || !order) {
    return null;
  }

  return (
    <OrderNoteForm
      key={order.id}
      order={order}
      onOpenChange={onOpenChange}
      onUpdated={onUpdated}
      fetchOrders={fetchOrders}
    />
  );
};

interface OrderNoteFormProps {
  order: Order;
  onOpenChange: (open: boolean) => void;
  onUpdated?: (order: Order) => void;
  fetchOrders: () => Promise<void>;
}

const OrderNoteForm = ({
  order,
  onOpenChange,
  onUpdated,
  fetchOrders,
}: OrderNoteFormProps) => {
  const [note, setNote] = useState(order.note || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleClose = () => {
    if (isUpdating) return;

    onOpenChange(false);
  };

  const handleSave = async () => {
    try {
      setIsUpdating(true);

      const result = await updateOrder(order.id, {
        note: note.trim() || null,
      });

      toast.success('Order note updated successfully');

      // Database থেকে fresh data
      await fetchOrders();

      onUpdated?.(result.data);

      onOpenChange(false);
    } catch (error) {
      console.error('Update order note error:', error);

      toast.error('Failed to update order note');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-background shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold">Order Note</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Add a note for {order.name || order.user?.name || 'this order'}
            </p>
          </div>

          <button
            type="button"
            disabled={isUpdating}
            onClick={handleClose}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="space-y-4 px-5 py-5">
          <div>
            <label htmlFor="order-note" className="text-sm font-medium">
              Note
            </label>

            <textarea
              id="order-note"
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Write a note for this order..."
              rows={5}
              disabled={isUpdating}
              className="mt-2 w-full resize-none rounded-md border bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-2 border-t px-5 py-4">
          <button
            type="button"
            disabled={isUpdating}
            onClick={handleClose}
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isUpdating}
            onClick={handleSave}
            className="inline-flex min-w-[100px] items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isUpdating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Note'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderNoteModal;
