'use client';

import { FormEvent, useEffect, useState } from 'react';
import { X } from 'lucide-react';

import { Shipment, ShipmentPayload } from '@/types/accounts/shipment.types';

interface ShipmentFormModalProps {
  open: boolean;
  shipment: Shipment | null;
  loading: boolean;
  onClose: () => void;
  onSubmit: (payload: ShipmentPayload) => void;
}

const initialForm: ShipmentPayload = {
  date: '',
  description: '',
  amount: 0,
  status: 'PAID',

  productName: '',
  quantity: 1,

  shippingCompany: '',
  weight: 0,
  perKgRate: 0,
  shippingCharge: 0,

  billingStatus: 'UNPAID',
  shippingStatus: 'PROCESSING',

  receivingDate: '',

  investorName: '',
};

const ShipmentFormModal = ({
  open,
  shipment,
  loading,
  onClose,
  onSubmit,
}: ShipmentFormModalProps) => {
  const [form, setForm] = useState<ShipmentPayload>(initialForm);

  useEffect(() => {
    if (!open) return;

    if (shipment) {
      setForm({
        date: shipment.date ? shipment.date.slice(0, 10) : '',

        description: shipment.description || '',

        amount: Number(shipment.amount),

        status: shipment.status,

        productName: shipment.productName,

        quantity: shipment.quantity,

        shippingCompany: shipment.shippingCompany,

        weight: Number(shipment.weight),

        perKgRate: Number(shipment.perKgRate),

        shippingCharge: Number(shipment.shippingCharge),

        billingStatus: shipment.billingStatus,

        shippingStatus: shipment.shippingStatus,

        receivingDate: shipment.receivingDate
          ? shipment.receivingDate.slice(0, 10)
          : '',

        investorName: shipment.investorName || '',
      });
    } else {
      setForm({
        ...initialForm,

        date: new Date().toISOString().slice(0, 10),
      });
    }
  }, [open, shipment]);

  if (!open) return null;

  const handleChange = (
    field: keyof ShipmentPayload,
    value: string | number,
  ) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      ...form,

      amount: Number(form.amount),

      quantity: Number(form.quantity),

      weight: Number(form.weight),

      perKgRate: Number(form.perKgRate),

      shippingCharge: Number(form.shippingCharge),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl border bg-background shadow-xl">
        {/* Header */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold">
              {shipment ? 'Update Shipment' : 'New Shipment'}
            </h2>

            <p className="text-sm text-muted-foreground">
              {shipment
                ? 'Update shipment information.'
                : 'Create a new shipment record.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-md p-2 hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Date / Amount */}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Date</label>

              <input
                type="date"
                value={form.date}
                onChange={e => handleChange('date', e.target.value)}
                required
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Amount (৳)
              </label>

              <input
                type="number"
                min="0"
                value={form.amount}
                onChange={e => handleChange('amount', Number(e.target.value))}
                required
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Description */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Description / Purpose
            </label>

            <textarea
              value={form.description}
              onChange={e => handleChange('description', e.target.value)}
              rows={3}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              placeholder="Shipment description..."
            />
          </div>

          {/* Status */}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Status</label>

              <select
                value={form.status}
                onChange={e =>
                  handleChange('status', e.target.value as 'PAID' | 'UNPAID')
                }
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm"
              >
                <option value="PAID">Paid</option>
                <option value="UNPAID">Unpaid</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Billing Status
              </label>

              <select
                value={form.billingStatus}
                onChange={e =>
                  handleChange(
                    'billingStatus',
                    e.target.value as 'PAID' | 'UNPAID',
                  )
                }
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm"
              >
                <option value="PAID">Paid</option>
                <option value="UNPAID">Unpaid</option>
              </select>
            </div>
          </div>

          {/* Product */}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Product Name
              </label>

              <input
                type="text"
                value={form.productName}
                onChange={e => handleChange('productName', e.target.value)}
                required
                placeholder="Product name"
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Quantity</label>

              <input
                type="number"
                min="1"
                value={form.quantity}
                onChange={e => handleChange('quantity', Number(e.target.value))}
                required
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm"
              />
            </div>
          </div>

          {/* Shipping */}

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Shipping Company
              </label>

              <input
                type="text"
                value={form.shippingCompany}
                onChange={e => handleChange('shippingCompany', e.target.value)}
                required
                placeholder="Steadfast"
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Weight</label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={form.weight}
                onChange={e => handleChange('weight', Number(e.target.value))}
                required
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Per Kg Rate
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={form.perKgRate}
                onChange={e =>
                  handleChange('perKgRate', Number(e.target.value))
                }
                required
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm"
              />
            </div>
          </div>

          {/* Shipping Charge */}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Shipping Charge
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={form.shippingCharge}
                onChange={e =>
                  handleChange('shippingCharge', Number(e.target.value))
                }
                required
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Shipping Status
              </label>

              <select
                value={form.shippingStatus}
                onChange={e =>
                  handleChange(
                    'shippingStatus',
                    e.target.value as 'PROCESSING' | 'COMPLETED',
                  )
                }
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm"
              >
                <option value="PROCESSING">Processing</option>

                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>

          {/* Receiving Date / Investor */}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Receiving Date
              </label>

              <input
                type="date"
                value={form.receivingDate || ''}
                onChange={e => handleChange('receivingDate', e.target.value)}
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Investor Name
              </label>

              <input
                type="text"
                value={form.investorName || ''}
                onChange={e => handleChange('investorName', e.target.value)}
                placeholder="Investor name"
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm"
              />
            </div>
          </div>

          {/* Actions */}

          <div className="flex justify-end gap-3 border-t pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
            >
              {loading ? 'Saving...' : shipment ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShipmentFormModal;
