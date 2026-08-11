'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Wholesale, WholesalePayload } from '@/types/accounts/wholesale.types';

interface WholesaleFormModalProps {
  open: boolean;
  wholesale: Wholesale | null;
  loading: boolean;
  onClose: () => void;
  onSubmit: (payload: WholesalePayload) => void;
}

const WholesaleFormModal = ({
  open,
  wholesale,
  loading,
  onClose,
  onSubmit,
}: WholesaleFormModalProps) => {
  const [form, setForm] = useState<WholesalePayload>({
    date: '',
    description: '',

    amount: 0,
    status: 'UNPAID',

    productName: '',
    quantity: 1,

    priceRmb: 0,
    priceTaka: 0,

    weight: 0,
    costPerKg: 0,

    shipping: 0,
    courierChina: '',

    note: '',

    onePairPrice: 0,
    salePrice: 0,

    loss: 0,
    profit: 0,
  });

  useEffect(() => {
    if (wholesale) {
      setForm({
        date: wholesale.date ? wholesale.date.slice(0, 10) : '',

        description: wholesale.description ?? '',

        amount: Number(wholesale.amount) || 0,
        status: wholesale.status,

        productName: wholesale.productName,
        quantity: wholesale.quantity,

        priceRmb: Number(wholesale.priceRmb) || 0,
        priceTaka: Number(wholesale.priceTaka) || 0,

        weight: Number(wholesale.weight) || 0,
        costPerKg: Number(wholesale.costPerKg) || 0,

        shipping: Number(wholesale.shipping) || 0,

        courierChina: wholesale.courierChina ?? '',

        note: wholesale.note ?? '',

        onePairPrice: Number(wholesale.onePairPrice) || 0,

        salePrice: Number(wholesale.salePrice) || 0,

        loss: Number(wholesale.loss) || 0,

        profit: Number(wholesale.profit) || 0,
      });
    } else {
      setForm({
        date: new Date().toISOString().slice(0, 10),
        description: '',

        amount: 0,
        status: 'UNPAID',

        productName: '',
        quantity: 1,

        priceRmb: 0,
        priceTaka: 0,

        weight: 0,
        costPerKg: 0,

        shipping: 0,
        courierChina: '',

        note: '',

        onePairPrice: 0,
        salePrice: 0,

        loss: 0,
        profit: 0,
      });
    }
  }, [wholesale, open]);

  if (!open) {
    return null;
  }

  const handleChange = (
    field: keyof WholesalePayload,
    value: string | number,
  ) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
      ...form,

      amount: Number(form.amount),

      quantity: Number(form.quantity),

      priceRmb: Number(form.priceRmb),

      priceTaka: Number(form.priceTaka),

      weight: Number(form.weight),

      costPerKg: Number(form.costPerKg),

      shipping: Number(form.shipping),

      onePairPrice: Number(form.onePairPrice),

      salePrice: Number(form.salePrice),

      loss: Number(form.loss),

      profit: Number(form.profit),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border bg-background shadow-xl">
        {/* Header */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold">
              {wholesale ? 'Update Wholesale' : 'New Wholesale'}
            </h2>

            <p className="text-sm text-muted-foreground">
              {wholesale
                ? 'Update wholesale record.'
                : 'Create a new wholesale record.'}
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

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Date */}

            <div>
              <label className="mb-1 block text-sm font-medium">Date</label>

              <input
                type="date"
                value={form.date}
                onChange={e => handleChange('date', e.target.value)}
                required
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>

            {/* Amount */}

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
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>

            {/* Status */}

            <div>
              <label className="mb-1 block text-sm font-medium">Status</label>

              <select
                value={form.status}
                onChange={e =>
                  handleChange('status', e.target.value as 'PAID' | 'UNPAID')
                }
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              >
                <option value="PAID">Paid</option>
                <option value="UNPAID">Unpaid</option>
              </select>
            </div>

            {/* Product Name */}

            <div>
              <label className="mb-1 block text-sm font-medium">
                Product Name
              </label>

              <input
                type="text"
                value={form.productName}
                onChange={e => handleChange('productName', e.target.value)}
                required
                placeholder="Men's Leather Loafer"
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>

            {/* Quantity */}

            <div>
              <label className="mb-1 block text-sm font-medium">Quantity</label>

              <input
                type="number"
                min="1"
                value={form.quantity}
                onChange={e => handleChange('quantity', Number(e.target.value))}
                required
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>

            {/* RMB */}

            <div>
              <label className="mb-1 block text-sm font-medium">
                Price (RMB)
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={form.priceRmb}
                onChange={e => handleChange('priceRmb', Number(e.target.value))}
                required
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>

            {/* Taka */}

            <div>
              <label className="mb-1 block text-sm font-medium">
                Price (Taka)
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={form.priceTaka}
                onChange={e =>
                  handleChange('priceTaka', Number(e.target.value))
                }
                required
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>

            {/* Weight */}

            <div>
              <label className="mb-1 block text-sm font-medium">
                Weight (kg)
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={form.weight}
                onChange={e => handleChange('weight', Number(e.target.value))}
                required
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>

            {/* Cost Per Kg */}

            <div>
              <label className="mb-1 block text-sm font-medium">
                Cost Per Kg
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={form.costPerKg}
                onChange={e =>
                  handleChange('costPerKg', Number(e.target.value))
                }
                required
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>

            {/* Shipping */}

            <div>
              <label className="mb-1 block text-sm font-medium">Shipping</label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={form.shipping}
                onChange={e => handleChange('shipping', Number(e.target.value))}
                required
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>

            {/* Courier */}

            <div>
              <label className="mb-1 block text-sm font-medium">
                Courier / China
              </label>

              <input
                type="text"
                value={form.courierChina ?? ''}
                onChange={e => handleChange('courierChina', e.target.value)}
                placeholder="China Cargo"
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>

            {/* One Pair Price */}

            <div>
              <label className="mb-1 block text-sm font-medium">
                One Pair Price
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={form.onePairPrice}
                onChange={e =>
                  handleChange('onePairPrice', Number(e.target.value))
                }
                required
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>

            {/* Sale Price */}

            <div>
              <label className="mb-1 block text-sm font-medium">
                Sale Price
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={form.salePrice}
                onChange={e =>
                  handleChange('salePrice', Number(e.target.value))
                }
                required
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>

            {/* Loss */}

            <div>
              <label className="mb-1 block text-sm font-medium">Loss</label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={form.loss}
                onChange={e => handleChange('loss', Number(e.target.value))}
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>

            {/* Profit */}

            <div>
              <label className="mb-1 block text-sm font-medium">Profit</label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={form.profit}
                onChange={e => handleChange('profit', Number(e.target.value))}
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Description */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Description / Purpose
            </label>

            <textarea
              value={form.description ?? ''}
              onChange={e => handleChange('description', e.target.value)}
              rows={3}
              placeholder="Wholesale purchase description..."
              className="w-full resize-none rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>

          {/* Note */}

          <div>
            <label className="mb-1 block text-sm font-medium">Note</label>

            <textarea
              value={form.note ?? ''}
              onChange={e => handleChange('note', e.target.value)}
              rows={3}
              placeholder="Additional note..."
              className="w-full resize-none rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 border-t pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Saving...' : wholesale ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WholesaleFormModal;
