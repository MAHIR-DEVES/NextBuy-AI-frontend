'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

import {
  InvestorPayment,
  InvestorPaymentPayload,
} from '@/types/accounts/investor-payment.types';

interface InvestorPaymentFormModalProps {
  open: boolean;
  payment: InvestorPayment | null;
  loading: boolean;

  onClose: () => void;
  onSubmit: (payload: InvestorPaymentPayload) => void;
}

const InvestorPaymentFormModal = ({
  open,
  payment,
  loading,
  onClose,
  onSubmit,
}: InvestorPaymentFormModalProps) => {
  const [form, setForm] = useState<InvestorPaymentPayload>({
    date: '',
    description: '',
    amount: 0,

    status: 'PAID',

    investorName: '',

    investedAmount: 0,
    receivedAmount: 0,

    paymentBy: '',
    referenceBy: '',
    platform: '',

    investmentStatus: 'RUNNING',

    monthsPaid: 0,

    buyProducts: '',
  });

  useEffect(() => {
    if (payment) {
      setForm({
        date: payment.date.slice(0, 10),

        description: payment.description,

        amount: Number(payment.amount),

        status: payment.status,

        investorName: payment.investorName,

        investedAmount: Number(payment.investedAmount),

        receivedAmount: Number(payment.receivedAmount),

        paymentBy: payment.paymentBy,

        referenceBy: payment.referenceBy,

        platform: payment.platform,

        investmentStatus: payment.investmentStatus,

        monthsPaid: payment.monthsPaid,

        buyProducts: payment.buyProducts || '',
      });
    } else {
      setForm({
        date: new Date().toISOString().slice(0, 10),

        description: '',

        amount: 0,

        status: 'PAID',

        investorName: '',

        investedAmount: 0,

        receivedAmount: 0,

        paymentBy: '',

        referenceBy: '',

        platform: '',

        investmentStatus: 'RUNNING',

        monthsPaid: 0,

        buyProducts: '',
      });
    }
  }, [payment, open]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    const numberFields = [
      'amount',
      'investedAmount',
      'receivedAmount',
      'monthsPaid',
    ];

    setForm(prev => ({
      ...prev,

      [name]: numberFields.includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-background shadow-xl">
        <div className="flex items-center justify-between border-b p-5">
          <div>
            <h2 className="text-lg font-semibold">
              {payment ? 'Update Investor Payment' : 'New Investor Payment'}
            </h2>

            <p className="text-sm text-muted-foreground">
              Manage investor payment information.
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

        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          {/* Date + Amount */}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Date</label>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Amount (৳)
              </label>

              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                min="0"
                required
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              />
            </div>
          </div>

          {/* Description */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Description / Purpose
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              required
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            />
          </div>

          {/* Status + Investor */}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Status</label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              >
                <option value="PAID">Paid</option>

                <option value="UNPAID">Unpaid</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Investor Name
              </label>

              <input
                type="text"
                name="investorName"
                value={form.investorName}
                onChange={handleChange}
                required
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              />
            </div>
          </div>

          {/* Invested + Received */}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Invested Amount (৳)
              </label>

              <input
                type="number"
                name="investedAmount"
                value={form.investedAmount}
                onChange={handleChange}
                min="0"
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Received Amount (৳)
              </label>

              <input
                type="number"
                name="receivedAmount"
                value={form.receivedAmount}
                onChange={handleChange}
                min="0"
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              />
            </div>
          </div>

          {/* Payment By + Reference By */}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Payment By
              </label>

              <input
                type="text"
                name="paymentBy"
                value={form.paymentBy}
                onChange={handleChange}
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Reference By
              </label>

              <input
                type="text"
                name="referenceBy"
                value={form.referenceBy}
                onChange={handleChange}
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              />
            </div>
          </div>

          {/* Platform + Investment Status */}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Platform</label>

              <input
                type="text"
                name="platform"
                value={form.platform}
                onChange={handleChange}
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Investment Status
              </label>

              <select
                name="investmentStatus"
                value={form.investmentStatus}
                onChange={handleChange}
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              >
                <option value="RUNNING">Running</option>

                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>

          {/* Months */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Profit Status — Months Paid
            </label>

            <input
              type="number"
              name="monthsPaid"
              value={form.monthsPaid}
              onChange={handleChange}
              min="0"
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
            />
          </div>

          {/* Products */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Buy Products
            </label>

            <textarea
              name="buyProducts"
              value={form.buyProducts}
              onChange={handleChange}
              rows={3}
              placeholder="e.g. Men's Leather Loafer, Safety Shoes"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            />
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3 border-t pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-md border px-4 py-2 text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
            >
              {loading ? 'Saving...' : payment ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvestorPaymentFormModal;
