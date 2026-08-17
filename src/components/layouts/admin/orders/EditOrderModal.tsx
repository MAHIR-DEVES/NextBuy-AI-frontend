'use client';

import { Loader2, X } from 'lucide-react';
import { useState } from 'react';

import { Order, OrderStatus, UpdateOrderPayload } from '@/types/orders';
import { updateOrder } from '@/services/orders.service';
import { toast } from 'sonner';

interface EditOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
  onUpdated?: (order: Order) => void;
  fetchOrders: () => Promise<void>;
}

const EditOrderModal = ({
  open,
  onOpenChange,
  order,
  onUpdated,
  fetchOrders,
}: EditOrderModalProps) => {
  if (!open || !order) {
    return null;
  }

  return (
    <EditOrderForm
      key={order.id}
      order={order}
      onOpenChange={onOpenChange}
      onUpdated={onUpdated}
      fetchOrders={fetchOrders}
    />
  );
};

interface EditOrderFormProps {
  order: Order;
  onOpenChange: (open: boolean) => void;
  onUpdated?: (order: Order) => void;
  fetchOrders: () => Promise<void>;
}

const EditOrderForm = ({
  order,
  onOpenChange,
  onUpdated,
  fetchOrders,
}: EditOrderFormProps) => {
  const [formData, setFormData] = useState({
    name: order.name || order.user?.name || '',
    phone: order.phone || order.user?.phone || '',
    district: order.district || '',
    thana: order.thana || '',
    address: order.address || '',
    status: order.status,
  });

  const [isUpdating, setIsUpdating] = useState(false);

  // ==============================
  // HANDLE INPUT CHANGE
  // ==============================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==============================
  // CLOSE MODAL
  // ==============================

  const handleClose = () => {
    if (isUpdating) {
      return;
    }

    onOpenChange(false);
  };

  // ==============================
  // UPDATE ORDER
  // ==============================

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsUpdating(true);

      const payload: UpdateOrderPayload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        district: formData.district.trim(),
        thana: formData.thana.trim(),
        address: formData.address.trim(),
        status: formData.status,
      };

      const result = await updateOrder(order.id, payload);

      // Fresh data from database
      await fetchOrders();

      onUpdated?.(result.data);

      toast.success('Order updated successfully');

      onOpenChange(false);
    } catch (error) {
      console.error('Update order error:', error);

      toast.error('Failed to update order');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
      onClick={handleClose}
    >
      <div
        className="my-8 w-full max-w-lg rounded-lg bg-background shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        {/* HEADER */}

        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold">Edit Order</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Update order information
            </p>
          </div>

          <button
            type="button"
            disabled={isUpdating}
            onClick={handleClose}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 px-5 py-5">
            {/* NAME */}

            <div>
              <label htmlFor="order-name" className="text-sm font-medium">
                Customer Name
              </label>

              <input
                id="order-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isUpdating}
                className="mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60"
                placeholder="Customer name"
              />
            </div>

            {/* PHONE */}

            <div>
              <label htmlFor="order-phone" className="text-sm font-medium">
                Phone
              </label>

              <input
                id="order-phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={isUpdating}
                className="mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60"
                placeholder="Phone number"
              />
            </div>

            {/* DISTRICT + THANA */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="order-district" className="text-sm font-medium">
                  District
                </label>

                <input
                  id="order-district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  disabled={isUpdating}
                  className="mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60"
                  placeholder="District"
                />
              </div>

              <div>
                <label htmlFor="order-thana" className="text-sm font-medium">
                  Thana
                </label>

                <input
                  id="order-thana"
                  name="thana"
                  value={formData.thana}
                  onChange={handleChange}
                  disabled={isUpdating}
                  className="mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60"
                  placeholder="Thana"
                />
              </div>
            </div>

            {/* ADDRESS */}

            <div>
              <label htmlFor="order-address" className="text-sm font-medium">
                Address
              </label>

              <textarea
                id="order-address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={isUpdating}
                rows={3}
                className="mt-1.5 w-full resize-none rounded-md border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60"
                placeholder="Delivery address"
              />
            </div>

            {/* STATUS */}

            <div>
              <label htmlFor="order-status" className="text-sm font-medium">
                Status
              </label>

              <select
                id="order-status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={isUpdating}
                className="mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                <option value="PENDING">Pending</option>
                <option value="SHIPPED">Shipped</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="PARTIAL">Partial</option>
              </select>
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
              type="submit"
              disabled={isUpdating}
              className="inline-flex min-w-[110px] items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Order'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOrderModal;
