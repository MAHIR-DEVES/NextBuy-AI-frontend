'use client';

import {
  createPersonalEntry,
  updatePersonalEntry,
} from '@/services/accounts/personal.service';
import {
  PersonalEntry,
  PersonalEntryPayload,
} from '@/types/accounts/personal-entry.types';
import { useState } from 'react';
import { toast } from 'sonner';

interface PersonalFormProps {
  entry: PersonalEntry | null;
  onClose: () => void;
  onSuccess: () => void;
}

const createInitialForm = (
  entry: PersonalEntry | null,
): PersonalEntryPayload => {
  if (entry) {
    return {
      date: entry.date ? new Date(entry.date).toISOString().split('T')[0] : '',
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
    date: '',
    description: '',
    amount: 0,
    status: 'PAID',
    type: 'COST',
    quantity: 0,
    priceRmb: 0,
    shippingCharge: 0,
    paidReceivedBy: '',
    platform: '',
    clearanceStatus: 'PENDING',
  };
};

const PersonalForm = ({ entry, onClose, onSuccess }: PersonalFormProps) => {
  const [form, setForm] = useState<PersonalEntryPayload>(() =>
    createInitialForm(entry),
  );

  const [saving, setSaving] = useState(false);

  const isEdit = Boolean(entry);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: ['amount', 'quantity', 'priceRmb', 'shippingCharge'].includes(
        name,
      )
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);

      if (isEdit && entry) {
        await updatePersonalEntry(entry.id, form);
      } else {
        await createPersonalEntry(form);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error(
        isEdit
          ? 'Failed to update personal entry:'
          : 'Failed to create personal entry:',
        error,
      );

      toast.error(
        isEdit
          ? 'Failed to update personal entry'
          : 'Failed to create personal entry',
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* DATE */}
        <div>
          <label className="mb-1.5 block text-sm font-medium">Date</label>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium">
            Description / Purpose
          </label>

          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description / Purpose"
            required
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
          />
        </div>

        {/* AMOUNT */}
        <div>
          <label className="mb-1.5 block text-sm font-medium">Amount (৳)</label>

          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            min="0"
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
          />
        </div>

        {/* STATUS */}
        <div>
          <label className="mb-1.5 block text-sm font-medium">Status</label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
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
            name="type"
            value={form.type}
            onChange={handleChange}
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
          >
            <option value="COST">Cost</option>
            <option value="RECEIVED">Received</option>
          </select>
        </div>

        {/* QUANTITY */}
        <div>
          <label className="mb-1.5 block text-sm font-medium">Quantity</label>

          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            min="0"
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
          />
        </div>

        {/* RMB */}
        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Price (RMB)
          </label>

          <input
            type="number"
            name="priceRmb"
            value={form.priceRmb}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
          />
        </div>

        {/* SHIPPING */}
        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Shipping / Charge
          </label>

          <input
            type="number"
            name="shippingCharge"
            value={form.shippingCharge}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
          />
        </div>

        {/* PAID / RECEIVED BY */}
        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Paid / Received By
          </label>

          <input
            type="text"
            name="paidReceivedBy"
            value={form.paidReceivedBy}
            onChange={handleChange}
            placeholder="Person / Method"
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
          />
        </div>

        {/* PLATFORM */}
        <div>
          <label className="mb-1.5 block text-sm font-medium">Platform</label>

          <input
            type="text"
            name="platform"
            value={form.platform}
            onChange={handleChange}
            placeholder="Alibaba / Facebook / Website"
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
          />
        </div>

        {/* CLEARANCE */}
        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Clearance Status
          </label>

          <select
            name="clearanceStatus"
            value={form.clearanceStatus}
            onChange={handleChange}
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
          >
            <option value="COMPLETED">Completed</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-2 border-t pt-4">
        <button
          type="button"
          onClick={onClose}
          disabled={saving}
          className="h-10 rounded-md border px-4 text-sm font-medium hover:bg-muted disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="h-10 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving
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

export default PersonalForm;
