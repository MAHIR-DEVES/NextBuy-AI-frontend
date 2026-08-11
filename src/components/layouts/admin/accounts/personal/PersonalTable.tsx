'use client';

import LoadingSpinner from '@/components/layouts/shared/dashboard/LoadingSpinner';
import {
  ClearanceStatus,
  PersonalEntry,
  PersonalEntryMeta,
  PersonalEntryStatus,
  PersonalEntryType,
} from '@/types/accounts/personal-entry.types';
import { ChevronLeft, ChevronRight, Edit, Loader2, Trash2 } from 'lucide-react';

interface PersonalTableProps {
  entries: PersonalEntry[];
  meta: PersonalEntryMeta;
  loading: boolean;

  onPageChange: (page: number) => void;

  onEdit: (entry: PersonalEntry) => void;

  onDelete: (id: string) => Promise<void>;

  deletingId: string | null;
}

const PersonalTable = ({
  entries,
  meta,
  loading,
  onPageChange,
  onEdit,
  onDelete,
  deletingId,
}: PersonalTableProps) => {
  return (
    <div className="overflow-hidden rounded-md border bg-background">
      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <LoadingSpinner message="personal entries"></LoadingSpinner>
        ) : entries.length === 0 ? (
          <div className="flex min-h-[300px] items-center justify-center px-6 text-center">
            <div>
              <p className="font-medium">No personal entries found</p>

              <p className="mt-1 text-sm text-muted-foreground">
                Create a new entry to get started.
              </p>
            </div>
          </div>
        ) : (
          <table className="w-full min-w-[1500px] text-sm">
            <thead className="border-b bg-muted/40">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>

                <th className="px-4 py-3 text-left">Description / Purpose</th>

                <th className="px-4 py-3 text-right">Amount</th>

                <th className="px-4 py-3 text-center">Status</th>

                <th className="px-4 py-3 text-center">Type</th>

                <th className="px-4 py-3 text-center">Quantity</th>

                <th className="px-4 py-3 text-right">Price (RMB)</th>

                <th className="px-4 py-3 text-right">Shipping / Charge</th>

                <th className="px-4 py-3 text-left">Paid / Received By</th>

                <th className="px-4 py-3 text-left">Platform</th>

                <th className="px-4 py-3 text-center">Clearance</th>

                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {entries.map(entry => {
                const isDeleting = deletingId === entry.id;

                return (
                  <tr key={entry.id} className="hover:bg-muted/30">
                    {/* DATE */}
                    <td className="whitespace-nowrap px-4 py-4">
                      {formatDate(entry.date)}
                    </td>

                    {/* DESCRIPTION */}
                    <td className="max-w-[260px] px-4 py-4">
                      <p className="truncate font-medium">
                        {entry.description || '-'}
                      </p>
                    </td>

                    {/* AMOUNT */}
                    <td className="whitespace-nowrap px-4 py-4 text-right font-medium">
                      ৳ {formatAmount(entry.amount)}
                    </td>

                    {/* STATUS */}
                    <td className="px-4 py-4 text-center">
                      <StatusBadge status={entry.status} />
                    </td>

                    {/* TYPE */}
                    <td className="px-4 py-4 text-center">
                      <TypeBadge type={entry.type} />
                    </td>

                    {/* QUANTITY */}
                    <td className="px-4 py-4 text-center">
                      {entry.quantity ?? '-'}
                    </td>

                    {/* RMB */}
                    <td className="whitespace-nowrap px-4 py-4 text-right">
                      {entry.priceRmb != null
                        ? `¥ ${formatAmount(entry.priceRmb)}`
                        : '-'}
                    </td>

                    {/* SHIPPING */}
                    <td className="whitespace-nowrap px-4 py-4 text-right">
                      {entry.shippingCharge != null
                        ? `৳ ${formatAmount(entry.shippingCharge)}`
                        : '-'}
                    </td>

                    {/* PAID BY */}
                    <td className="px-4 py-4">{entry.paidReceivedBy || '-'}</td>

                    {/* PLATFORM */}
                    <td className="px-4 py-4">{entry.platform || '-'}</td>

                    {/* CLEARANCE */}
                    <td className="px-4 py-4 text-center">
                      <ClearanceBadge status={entry.clearanceStatus} />
                    </td>

                    {/* ACTION */}
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* EDIT */}
                        <button
                          type="button"
                          disabled={isDeleting}
                          onClick={() => onEdit(entry)}
                          className="inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-xs font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Edit className="h-3.5 w-3.5" />
                          Edit
                        </button>

                        {/* DELETE */}
                        <button
                          type="button"
                          disabled={isDeleting}
                          onClick={() => onDelete(entry.id)}
                          className="inline-flex h-9 items-center gap-1.5 rounded-md border border-red-500/20 px-3 text-xs font-medium text-red-600 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isDeleting ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}

                          {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* PAGINATION */}
      {!loading && entries.length > 0 && (
        <div className="flex flex-col gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(meta.page - 1) * meta.limit + 1} -{' '}
            {Math.min(meta.page * meta.limit, meta.total)} of {meta.total}
          </p>

          {meta.totalPages > 1 && (
            <div className="flex items-center gap-1">
              {/* PREVIOUS */}
              <button
                type="button"
                disabled={!meta.hasPreviousPage}
                onClick={() => onPageChange(meta.page - 1)}
                className="flex h-9 w-9 items-center justify-center rounded-md border transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* PAGE NUMBERS */}
              {getPaginationPages(meta.page, meta.totalPages).map(page => (
                <button
                  key={page}
                  type="button"
                  onClick={() => onPageChange(page)}
                  className={`h-9 min-w-9 rounded-md px-2 text-sm transition ${
                    meta.page === page
                      ? 'bg-primary text-primary-foreground'
                      : 'border hover:bg-muted'
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* NEXT */}
              <button
                type="button"
                disabled={!meta.hasNextPage}
                onClick={() => onPageChange(meta.page + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-md border transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ==============================
// STATUS BADGE
// ==============================

const StatusBadge = ({ status }: { status: PersonalEntryStatus }) => {
  const classes: Record<PersonalEntryStatus, string> = {
    PAID: 'bg-green-500/10 text-green-600 border-green-500/20',

    UNPAID: 'bg-red-500/10 text-red-600 border-red-500/20',

    RECEIVED: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${classes[status]}`}
    >
      {status}
    </span>
  );
};

// ==============================
// TYPE BADGE
// ==============================

const TypeBadge = ({ type }: { type: PersonalEntryType }) => {
  return (
    <span className="inline-flex rounded-full border bg-muted/40 px-2.5 py-1 text-xs font-medium">
      {type}
    </span>
  );
};

// ==============================
// CLEARANCE BADGE
// ==============================

const ClearanceBadge = ({ status }: { status: ClearanceStatus }) => {
  const classes: Record<ClearanceStatus, string> = {
    COMPLETED: 'bg-green-500/10 text-green-600 border-green-500/20',

    PENDING: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${classes[status]}`}
    >
      {status}
    </span>
  );
};

// ==============================
// PAGINATION
// ==============================

const getPaginationPages = (current: number, total: number) => {
  if (total <= 5) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  if (current <= 3) {
    return [1, 2, 3, 4, 5];
  }

  if (current >= total - 2) {
    return [total - 4, total - 3, total - 2, total - 1, total];
  }

  return [current - 2, current - 1, current, current + 1, current + 2];
};

// ==============================
// HELPERS
// ==============================

const formatDate = (date: string) => {
  if (!date) return '-';

  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const formatAmount = (amount: number | string | null | undefined) => {
  if (amount == null) return '0';

  return Number(amount).toLocaleString();
};

export default PersonalTable;
