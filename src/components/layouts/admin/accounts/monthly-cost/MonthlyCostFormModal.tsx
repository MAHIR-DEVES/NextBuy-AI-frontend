'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

import {
  MonthlyCost,
  MonthlyCostPayload,
  MonthlyCostStatus,
} from '@/types/accounts/monthly-cost.types';

interface MonthlyCostFormModalProps {
  open: boolean;
  cost: MonthlyCost | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (payload: MonthlyCostPayload) => Promise<void>;
}

const MonthlyCostFormModal = ({
  open,
  cost,
  loading = false,
  onClose,
  onSubmit,
}: MonthlyCostFormModalProps) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<MonthlyCostStatus>('UNPAID');

  useEffect(() => {
    if (!open) return;

    if (cost) {
      setDate(cost.date ? cost.date.slice(0, 10) : '');
      setDescription(cost.description || '');
      setAmount(String(cost.amount ?? ''));
      setStatus(cost.status);
    } else {
      const today = new Date().toISOString().slice(0, 10);

      setDate(today);
      setDescription('');
      setAmount('');
      setStatus('UNPAID');
    }
  }, [open, cost]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !description || !amount) {
      return;
    }

    await onSubmit({
      date,
      description: description.trim(),
      amount: Number(amount),
      status,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-background shadow-xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold">
              {cost ? 'Update Monthly Cost' : 'New Monthly Cost'}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {cost
                ? 'Update monthly cost information.'
                : 'Add a new monthly cost record.'}
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

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          {/* Date */}

          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>

            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              disabled={loading}
              required
            />
          </div>

          {/* Description */}

          <div className="space-y-2">
            <label className="text-sm font-medium">Description / Purpose</label>

            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter description or purpose"
              rows={3}
              className="w-full resize-none rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              disabled={loading}
              required
            />
          </div>

          {/* Amount */}

          <div className="space-y-2">
            <label className="text-sm font-medium">Amount (৳)</label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              disabled={loading}
              required
            />
          </div>

          {/* Status */}

          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>

            <select
              value={status}
              onChange={e => setStatus(e.target.value as MonthlyCostStatus)}
              className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              disabled={loading}
            >
              <option value="PAID">Paid</option>
              <option value="UNPAID">Unpaid</option>
            </select>
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3 border-t pt-4">
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
              className="inline-flex h-10 min-w-24 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              ) : cost ? (
                'Update'
              ) : (
                'Save'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MonthlyCostFormModal;
