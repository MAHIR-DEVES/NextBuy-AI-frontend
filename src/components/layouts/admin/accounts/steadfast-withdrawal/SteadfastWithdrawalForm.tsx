'use client';

import {
  SteadfastWithdrawal,
  SteadfastWithdrawalClearanceStatus,
  SteadfastWithdrawalPayload,
  SteadfastWithdrawalStatus,
} from '@/types/accounts/steadfast-withdrawal.types';
import { useEffect, useState } from 'react';

interface SteadfastWithdrawalFormProps {
  withdrawal: SteadfastWithdrawal | null;
  loading?: boolean;
  onSubmit: (payload: SteadfastWithdrawalPayload) => Promise<void>;
  onClose: () => void;
}

const getInitialForm = (): SteadfastWithdrawalPayload => ({
  date: new Date().toISOString().slice(0, 10),
  description: '',
  amount: 0,
  status: 'PAID',
  withdrawBy: '',
  paymentMethod: '',
  clearanceStatus: 'PENDING',
});

const SteadfastWithdrawalForm = ({
  withdrawal,
  loading = false,
  onSubmit,
  onClose,
}: SteadfastWithdrawalFormProps) => {
  const [form, setForm] =
    useState<SteadfastWithdrawalPayload>(getInitialForm());

  const isEdit = Boolean(withdrawal);

  useEffect(() => {
    if (!withdrawal) {
      setForm(getInitialForm());
      return;
    }

    setForm({
      date: withdrawal.date
        ? new Date(withdrawal.date).toISOString().slice(0, 10)
        : '',
      description: withdrawal.description || '',
      amount: Number(withdrawal.amount) || 0,
      status: withdrawal.status,
      withdrawBy: withdrawal.withdrawBy || '',
      paymentMethod: withdrawal.paymentMethod || '',
      clearanceStatus: withdrawal.clearanceStatus,
    });
  }, [withdrawal]);

  const handleChange = (
    field: keyof SteadfastWithdrawalPayload,
    value: string | number,
  ) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
          <label className="mb-1.5 block text-sm font-medium">Amount (৳)</label>

          <input
            type="number"
            min="0"
            step="0.01"
            value={form.amount}
            onChange={e => handleChange('amount', Number(e.target.value))}
            required
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* STATUS */}

        <div>
          <label className="mb-1.5 block text-sm font-medium">Status</label>

          <select
            value={form.status}
            onChange={e =>
              handleChange(
                'status',
                e.target.value as SteadfastWithdrawalStatus,
              )
            }
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
          >
            <option value="PAID">Paid</option>
            <option value="UNPAID">Unpaid</option>
          </select>
        </div>

        {/* WITHDRAW BY */}

        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Withdraw By
          </label>

          <input
            type="text"
            value={form.withdrawBy}
            onChange={e => handleChange('withdrawBy', e.target.value)}
            placeholder="e.g. Mahir"
            required
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* PAYMENT METHOD */}

        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Payment Method
          </label>

          <input
            type="text"
            value={form.paymentMethod}
            onChange={e => handleChange('paymentMethod', e.target.value)}
            placeholder="e.g. bKash / Bank"
            required
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* CLEARANCE STATUS */}

        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Clearance Status
          </label>

          <select
            value={form.clearanceStatus}
            onChange={e =>
              handleChange(
                'clearanceStatus',
                e.target.value as SteadfastWithdrawalClearanceStatus,
              )
            }
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
          >
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      {/* ACTIONS */}

      <div className="flex justify-end gap-2 border-t pt-4">
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
            ? isEdit
              ? 'Updating...'
              : 'Saving...'
            : isEdit
              ? 'Update'
              : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default SteadfastWithdrawalForm;
