'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

import {
  ClearanceStatus,
  PersonalEntry,
  PersonalEntryPayload,
  PersonalEntryStatus,
  PersonalEntryType,
} from '@/types/accounts/personal-entry.types';

interface PersonalEntryModalProps {
  open: boolean;
  entry: PersonalEntry | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (payload: PersonalEntryPayload) => Promise<void>;
}

const getInitialForm = (entry: PersonalEntry | null): PersonalEntryPayload => {
  if (entry) {
    return {
      date: entry.date ? new Date(entry.date).toISOString().slice(0, 10) : '',
      description: entry.description || '',
      amount: Number(entry.amount) || 0,
      status: entry.status,
      type: entry.type,
      quantity: Number(entry.quantity) || 0,
      priceRmb: Number(entry.priceRmb) || 0,
      shippingCharge: Number(entry.shippingCharge) || 0,
      paidReceivedBy: entry.paidReceivedBy || '',
      platform: entry.platform || '',
      clearanceStatus: entry.clearanceStatus,
    };
  }

  return {
    date: new Date().toISOString().slice(0, 10),
    description: '',
    amount: 0,
    status: 'PAID',
    type: 'COST',
    quantity: 1,
    priceRmb: 0,
    shippingCharge: 0,
    paidReceivedBy: '',
    platform: '',
    clearanceStatus: 'PENDING',
  };
};

const PersonalEntryModal = ({
  open,
  entry,
  loading = false,
  onClose,
  onSubmit,
}: PersonalEntryModalProps) => {
  const [form, setForm] = useState<PersonalEntryPayload>(() =>
    getInitialForm(entry),
  );

  if (!open) {
    return null;
  }

  const handleChange = (
    field: keyof PersonalEntryPayload,
    value: string | number,
  ) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await onSubmit(form);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={e => {
        if (e.target === e.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl border bg-background shadow-xl">
        {/* HEADER */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold">
              {entry ? 'Edit Personal Entry' : 'New Personal Entry'}
            </h2>

            <p className="mt-0.5 text-xs text-muted-foreground">
              {entry
                ? 'Update personal account information.'
                : 'Add a new personal account entry.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-md p-2 hover:bg-muted disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* DATE */}

            <div>
              <label className="mb-1.5 block text-sm font-medium">Date</label>

              <input
                type="date"
                value={form.date}
                onChange={e => handleChange('date', e.target.value)}
                required
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* DESCRIPTION */}

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Description / Purpose
              </label>

              <input
                type="text"
                value={form.description}
                onChange={e => handleChange('description', e.target.value)}
                placeholder="Enter description"
                required
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* AMOUNT */}

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Amount (৳)
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={form.amount}
                onChange={e => handleChange('amount', Number(e.target.value))}
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* STATUS */}

            <div>
              <label className="mb-1.5 block text-sm font-medium">Status</label>

              <select
                value={form.status}
                onChange={e =>
                  handleChange('status', e.target.value as PersonalEntryStatus)
                }
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              >
                <option value="PAID">Paid</option>
                <option value="UNPAID">Unpaid</option>
                <option value="RECEIVED">Received</option>
              </select>
            </div>

            {/* TYPE */}

            <div>
              <label className="mb-1.5 block text-sm font-medium">Type</label>

              <select
                value={form.type}
                onChange={e =>
                  handleChange('type', e.target.value as PersonalEntryType)
                }
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              >
                <option value="COST">Cost</option>
                <option value="RECEIVED">Received</option>
              </select>
            </div>

            {/* QUANTITY */}

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Quantity
              </label>

              <input
                type="number"
                min="0"
                value={form.quantity}
                onChange={e => handleChange('quantity', Number(e.target.value))}
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>

            {/* RMB */}

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Price (RMB)
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={form.priceRmb}
                onChange={e => handleChange('priceRmb', Number(e.target.value))}
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>

            {/* SHIPPING */}

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Shipping / Charge
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={form.shippingCharge}
                onChange={e =>
                  handleChange('shippingCharge', Number(e.target.value))
                }
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>

            {/* PAID RECEIVED BY */}

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Paid / Received By
              </label>

              <input
                type="text"
                value={form.paidReceivedBy}
                onChange={e => handleChange('paidReceivedBy', e.target.value)}
                placeholder="e.g. Mahir"
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>

            {/* PLATFORM */}

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Platform
              </label>

              <input
                type="text"
                value={form.platform}
                onChange={e => handleChange('platform', e.target.value)}
                placeholder="e.g. Alibaba"
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>

            {/* CLEARANCE */}

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Clearance Status
              </label>

              <select
                value={form.clearanceStatus}
                onChange={e =>
                  handleChange(
                    'clearanceStatus',
                    e.target.value as ClearanceStatus,
                  )
                }
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              >
                <option value="PENDING">Pending</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>

          {/* ACTION */}

          <div className="mt-6 flex justify-end gap-2 border-t pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="h-10 rounded-lg border px-4 text-sm font-medium hover:bg-muted disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="h-10 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? entry
                  ? 'Updating...'
                  : 'Saving...'
                : entry
                  ? 'Update'
                  : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalEntryModal;
